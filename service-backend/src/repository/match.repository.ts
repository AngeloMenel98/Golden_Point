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
    const subquery = AppDataSource.createQueryBuilder()
      .select("tm.matchId", "matchId")
      .addSelect(`STRING_AGG(distinct t.teamName, ', ') AS "teamsNames"`)
      .from("team_match", "tm")
      .innerJoin("team", "t", 't.id = tm."teamId"')
      .where("t.category = :category", { category })
      .groupBy("tm.matchId");

    const matches = await this.createQueryBuilder("m")
      .select([
        "m.matchDate as matchDate",
        "m.amountTourPoints AS tourPoints",
        "m.amountTourCoins AS tourCoins",
        "gs.groupStage as groupStage",
        'teams_agg."teamsNames" AS teamsName',
        "c.courtNumber AS court",
        "cl.clubName AS clubName",
      ])
      .innerJoin("group_stage", "gs", "gs.id = m.groupStageId")
      .innerJoin("tournament", "trn", "trn.id = m.tournamentId")
      .innerJoin("court", "c", "c.id = m.courtId")
      .innerJoin("club", "cl", "cl.id = c.clubId")
      .leftJoin(
        "(" + subquery.getQuery() + ")",
        "teams_agg",
        'teams_agg."matchId" = m.id'
      )
      .setParameters(subquery.getParameters())
      .where("trn.id = :tournamentId", { tournamentId })
      .andWhere("gs.groupStage = :groupStage", { groupStage })
      .orderBy("m.matchDate")
      .getRawMany();

    return matches;
  },
});
