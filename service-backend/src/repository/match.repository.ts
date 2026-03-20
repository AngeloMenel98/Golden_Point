import { AppDataSource } from "../data-source";
import {
  Category,
  Court,
  GroupStage,
  Match,
  Team,
  TeamMatch,
  Tournament,
} from "../entity";

// Knockout stage names - exported for use elsewhere
export const KNOCKOUT_STAGES = {
  CUARTOS: "Cuartos de Final",
  SEMIFINAL: "Semifinales",
  FINAL: "Final",
} as const;

// Group stage names (non-knockout stages)
export const GROUP_STAGE_PREFIX = "Grupo";

export const MatchRepository = AppDataSource.getRepository(Match).extend({
  async create(
    match: Match,
    teams: Team[],
    tournament: Tournament,
    court: Court,
    groupStage: string
  ) {
    return this.manager.transaction(async (transactionalEntityManager) => {
      const tmMatch: TeamMatch[] = [];

      let savedGroupStage = await transactionalEntityManager
        .getRepository(GroupStage)
        .findOne({ where: { groupStage: groupStage } });

      if (!savedGroupStage) {
        savedGroupStage = transactionalEntityManager
          .getRepository(GroupStage)
          .create({ groupStage: groupStage });
        savedGroupStage = await transactionalEntityManager
          .getRepository(GroupStage)
          .save(savedGroupStage);
      }

      const savedMatch = await transactionalEntityManager
        .getRepository(Match)
        .save({ ...match, court, tournament, groupStage: savedGroupStage });

      teams.forEach((team) => {
        const teamMatch = new TeamMatch();
        teamMatch.team = team;
        teamMatch.match = savedMatch;

        teamMatch.isWinner = false;
        tmMatch.push(teamMatch);
      });

      await transactionalEntityManager.save(tmMatch);

      return savedMatch;
    });
  },

  /**
   * Get all matches for a category (all stages including group and knockout)
   */
  async getMatchesByCategory(categoryId: string): Promise<Match[]> {
    return this.createQueryBuilder("m")
      .innerJoin("m.tournament", "t")
      .innerJoin("t.categories", "c")
      .innerJoin("m.groupStage", "gs")
      .leftJoinAndSelect("m.teamMatches", "tm")
      .leftJoinAndSelect("tm.team", "team")
      .where("c.id = :categoryId", { categoryId })
      .getMany();
  },

  /**
   * Check if knockout matches exist for a specific stage
   */
  async hasKnockoutMatches(
    tournamentId: string,
    categoryId: string,
    stageName: string
  ): Promise<boolean> {
    const count = await this.createQueryBuilder("m")
      .innerJoin("m.tournament", "t")
      .innerJoin("t.categories", "c")
      .innerJoin("m.groupStage", "gs")
      .where("t.id = :tournamentId", { tournamentId })
      .andWhere("c.id = :categoryId", { categoryId })
      .andWhere("gs.groupStage = :stageName", { stageName })
      .getCount();

    return count > 0;
  },

  /**
   * Count matches by status for specific stages
   * @param tournamentId 
   * @param categoryId 
   * @param stageNames Array of stage names to check
   * @param completedStatus 'COMPLETED' if all matches need to be completed, undefined for all matches
   */
  async countMatchesByStatus(
    tournamentId: string,
    categoryId: string,
    stageNames: string[]
  ): Promise<{ total: number; completed: number }> {
    if (stageNames.length === 0) {
      return { total: 0, completed: 0 };
    }

    const stagePlaceholders = stageNames.map((_, i) => `:stage${i}`).join(", ");
    const params: Record<string, unknown> = { tournamentId, categoryId };
    stageNames.forEach((stage, i) => {
      params[`stage${i}`] = stage;
    });

    const result = await this.createQueryBuilder("m")
      .select("COUNT(m.id)", "total")
      .addSelect(
        "COUNT(CASE WHEN tm.isWinner = true THEN 1 END)",
        "completed"
      )
      .innerJoin("m.tournament", "t")
      .innerJoin("t.categories", "c")
      .innerJoin("m.groupStage", "gs")
      .innerJoin("m.teamMatches", "tm")
      .where("t.id = :tournamentId", { tournamentId })
      .andWhere("c.id = :categoryId", { categoryId })
      .andWhere(`gs.groupStage IN (${stagePlaceholders})`, params)
      .getRawOne();

    return {
      total: parseInt(result.total, 10) || 0,
      completed: parseInt(result.completed, 10) || 0,
    };
  },

  /**
   * Get group stage matches for a category (non-knockout stages)
   */
  async getGroupStageMatches(
    tournamentId: string,
    categoryId: string
  ): Promise<Match[]> {
    return this.createQueryBuilder("m")
      .innerJoin("m.tournament", "t")
      .innerJoin("t.categories", "c")
      .innerJoin("m.groupStage", "gs")
      .leftJoinAndSelect("m.teamMatches", "tm")
      .leftJoinAndSelect("tm.team", "team")
      .where("t.id = :tournamentId", { tournamentId })
      .andWhere("c.id = :categoryId", { categoryId })
      .andWhere("gs.groupStage NOT IN (:...knockoutStages)", {
        knockoutStages: [
          KNOCKOUT_STAGES.CUARTOS,
          KNOCKOUT_STAGES.SEMIFINAL,
          KNOCKOUT_STAGES.FINAL,
        ],
      })
      .getMany();
  },

  /**
   * Get knockout matches by stage
   */
  async getKnockoutMatches(
    tournamentId: string,
    categoryId: string,
    stageName: string
  ): Promise<Match[]> {
    return this.createQueryBuilder("m")
      .innerJoin("m.tournament", "t")
      .innerJoin("t.categories", "c")
      .innerJoin("m.groupStage", "gs")
      .leftJoinAndSelect("m.teamMatches", "tm")
      .leftJoinAndSelect("tm.team", "team")
      .where("t.id = :tournamentId", { tournamentId })
      .andWhere("c.id = :categoryId", { categoryId })
      .andWhere("gs.groupStage = :stageName", { stageName })
      .getMany();
  },

  /**
   * Get all scheduled match dates for a category
   */
  async getScheduledDatesByCategory(
    tournamentId: string,
    categoryId: string
  ): Promise<string[]> {
    const results = await this.createQueryBuilder("m")
      .select("DISTINCT m.matchDate", "matchDate")
      .innerJoin("m.tournament", "t")
      .innerJoin("t.categories", "c")
      .where("t.id = :tournamentId", { tournamentId })
      .andWhere("c.id = :categoryId", { categoryId })
      .getRawMany();

    return results.map((r) => r.matchDate);
  },

  async getMatches(tournamentId: string, category: string, groupStage: string) {
    // Subquery for team aggregation
    const teamSubquery = AppDataSource.createQueryBuilder()
      .select("tm.matchId as matchId")
      .addSelect("STRING_AGG(DISTINCT t.teamName, ', ') AS teamNames")
      .from("team_match", "tm")
      .innerJoin("team", "t", 't.id = tm."teamId"')
      .where("t.category = :category", { category })
      .groupBy("tm.matchId");

    // Subquery for set aggregation
    const setSubquery = AppDataSource.createQueryBuilder()
      .select("s.matchId as matchId")
      .addSelect(
        "STRING_AGG(COALESCE(s.gamesTeam1) || '-' || COALESCE(s.gamesTeam2), ', ') AS games"
      )
      .from("set", "s")
      .groupBy("s.matchId");

    // Main query
    const matches = await this.createQueryBuilder("m")
      .select([
        "m.id AS id",
        "m.matchDate AS matchDate",
        "m.amountTourPoints AS amountTourPoints",
        "m.amountTourCoins AS amountTourCoins",
        "gs.groupStage AS groupStage",
        "teams_agg.teamNames AS teamsName",
        "t.category AS category",
        "c.courtNumber AS courtNumber",
        "cl.id AS clubId",
        'cl."clubName" AS clubName',
        "set_agg.games AS games",
      ])
      .innerJoin("group_stage", "gs", "gs.id = m.groupStageId")
      .innerJoin("tournament", "trn", "trn.id = m.tournamentId")
      .innerJoin(
        "(" + teamSubquery.getQuery() + ")",
        "teams_agg",
        "teams_agg.matchId = m.id"
      )
      .innerJoin("team_match", "tm", "tm.matchId = m.id")
      .innerJoin("team", "t", "t.id = tm.teamId")
      .innerJoin("court", "c", "c.id = m.courtId")
      .innerJoin("club", "cl", "cl.id = c.clubId")
      .leftJoin(
        "(" + setSubquery.getQuery() + ")",
        "set_agg",
        "set_agg.matchId = m.id"
      )
      .setParameters({
        ...teamSubquery.getParameters(),
        ...setSubquery.getParameters(),
      })
      .where("trn.id = :tournamentId", { tournamentId })
      .andWhere("gs.groupStage = :groupStage", { groupStage })
      .groupBy(
        'm.id, m.matchDate, m.amountTourPoints, m.amountTourCoins, gs.groupStage, c.courtNumber, cl.id ,cl."clubName", t.category, teams_agg.teamNames, set_agg.games'
      )
      .orderBy("m.matchDate")
      .getRawMany();

    return matches;
  },

  async updateMatch(matchId: string, matchDate: string, court: Court) {
    return this.createQueryBuilder()
      .update(Match)
      .set({ matchDate, court })
      .where("id = :matchId", { matchId })
      .execute();
  },
});
