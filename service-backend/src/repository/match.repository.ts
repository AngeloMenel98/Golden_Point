import { AppDataSource } from "../data-source";
import {
  Category,
  Court,
  GroupStage,
  Match,
  Team,
  TeamMatch,
  Tournament,
  Set as MatchSet,
} from "../entity";

// Structured response types
export interface MatchTeamResponse {
  teamId: string;
  teamName: string;
  players: { firstName: string; lastName: string }[];
  isWinner: boolean;
}

export interface MatchSetResponse {
  setNumber: number;
  gamesTeam1: number;
  gamesTeam2: number;
}

export interface MatchResponse {
  id: string;
  matchDate: string;
  amountTourPoints: number;
  amountTourCoins: number;
  groupStage: string;
  category: string;
  courtNumber: number;
  clubId: string;
  clubName: string;
  teams: MatchTeamResponse[];
  sets: MatchSetResponse[];
}

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
    groupStage: string,
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
    stageName: string,
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
    stageNames: string[],
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
      .addSelect("COUNT(CASE WHEN tm.isWinner = true THEN 1 END)", "completed")
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
    categoryId: string,
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
    stageName: string,
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
    categoryId: string,
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

  async getMatches(
    tournamentId: string,
    category: string,
    groupStage: string,
  ): Promise<MatchResponse[]> {
    const matches = await this.createQueryBuilder("m")
      .select([
        "m.id AS id",
        "m.matchDate AS matchDate",
        "m.amountTourPoints AS amountTourPoints",
        "m.amountTourCoins AS amountTourCoins",
        "gs.groupStage AS groupStage",
        "cat.category AS category",
        "court.courtNumber AS courtNumber",
        "cl.id AS clubId",
        'cl."clubName" AS clubName',
      ])
      .innerJoin("tournament", "t", "t.id = m.tournamentId")
      .innerJoin("t.categories", "cat")
      .innerJoin("group_stage", "gs", "gs.id = m.groupStageId")
      .innerJoin("court", "court", "court.id = m.courtId")
      .innerJoin("club", "cl", "cl.id = court.clubId")
      .where("t.id = :tournamentId", { tournamentId })
      .andWhere("CONCAT(cat.gender, '-', cat.category) = :category", {
        category,
      })
      .andWhere("gs.groupStage = :groupStage", { groupStage })
      .orderBy("m.matchDate")
      .getRawMany();

    const matchIds = matches.map((m) => m.id);

    if (matchIds.length === 0) {
      return [];
    }

    // Get all team matches for these matches
    const teamMatches = await this.createQueryBuilder()
      .select([
        "tm.matchId AS matchId",
        "tm.teamId AS teamId",
        "tm.isWinner AS isWinner",
        "t.teamName AS teamName",
      ])
      .distinct(true)
      .from("team_match", "tm")
      .innerJoin("team", "t", 't.id = tm."teamId"')
      .where("tm.matchId IN (:...matchIds)", { matchIds })
      .getRawMany();

    const teamIds = [...new Set(teamMatches.map((tm) => tm.teamid))];

    let teamPlayers: { teamId: string; firstName: string; lastName: string }[] =
      [];

    if (teamIds.length > 0) {
      try {
        teamPlayers = await this.createQueryBuilder()
          .select("t.id", "teamId")
          .addSelect("pd.firstName", "firstName")
          .addSelect("pd.lastName", "lastName")
          .from("team", "t")
          .innerJoin("team_users_user", "tuu", 'tuu."teamId" = t.id')
          .innerJoin("user", "u", 'u.id = tuu."userId"')
          .innerJoin("personal_data", "pd", 'pd."userId" = u.id')
          .where("t.id IN (:...teamIds)", { teamIds })
          .distinct(true)
          .getRawMany();
      } catch (error) {
        console.error("query error", error.message);
      }
    }

    const sets = await this.createQueryBuilder()
      .select([
        "s.id AS id",
        "s.matchId AS matchId",
        "s.gamesTeam1 AS gamesTeam1",
        "s.gamesTeam2 AS gamesTeam2",
      ])
      .distinct(true)
      .from("set", "s")
      .where("s.matchId IN (:...matchIds)", { matchIds })
      .orderBy("s.matchId")
      .getRawMany();

    const response: MatchResponse[] = matches.map((match) => {
      const matchTeamMatches = teamMatches.filter(
        (tm) => tm.matchid === match.id,
      );

      const teams: MatchTeamResponse[] = matchTeamMatches.map((tm) => {
        const players = teamPlayers
          .filter((tp) => tp.teamId === tm.teamid)
          .map((tp) => ({
            firstName: tp.firstName,
            lastName: tp.lastName,
          }));

        return {
          teamId: tm.teamid,
          teamName: tm.teamname,
          players,
          isWinner: tm.iswinner,
        };
      });

      // Get sets for this match
      const matchSets = sets.filter((s) => s.matchid === match.id);

      const formattedSets: MatchSetResponse[] = matchSets.map((s) => ({
        setNumber: parseInt(s.setNumber, 10),
        gamesTeam1: parseInt(s.gamesteam1, 10),
        gamesTeam2: parseInt(s.gamesteam2, 10),
      }));

      return {
        id: match.id,
        matchDate: match.matchdate,
        amountTourPoints: parseInt(match.amounttourpoints, 10),
        amountTourCoins: parseInt(match.amounttourcoins, 10),
        groupStage: match.groupstage,
        category: match.category,
        courtNumber: parseInt(match.courtnumber, 10),
        clubId: match.clubId,
        clubName: match.clubname,
        teams,
        sets: formattedSets,
      };
    });

    return response;
  },

  async updateMatch(matchId: string, matchDate: string, court: Court) {
    return this.createQueryBuilder()
      .update(Match)
      .set({ matchDate, court })
      .where("id = :matchId", { matchId })
      .execute();
  },
});
