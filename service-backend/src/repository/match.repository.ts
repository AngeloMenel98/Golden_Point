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
        "cl.clubName AS clubName",
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
        "m.id, m.matchDate, m.amountTourPoints, m.amountTourCoins, gs.groupStage, c.courtNumber, cl.clubName, t.category, teams_agg.teamNames, set_agg.games"
      )
      .orderBy("m.matchDate")
      .getRawMany();

    return matches;
  },

  async updateMatch(matchId: string, matchDate: string, court: Court) {
    return this.createQueryBuilder()
      .update(Match) // Asegúrate de usar la entidad correcta
      .set({ matchDate, court }) // Actualizas la relación pasando el id de la cancha
      .where("id = :matchId", { matchId })
      .execute();
  },
});
