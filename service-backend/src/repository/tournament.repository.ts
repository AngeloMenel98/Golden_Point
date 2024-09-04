import { AppDataSource } from "../data-source";
import { Category, Tour, Tournament } from "../entity";

export const TournamentRepository = AppDataSource.getRepository(
  Tournament
).extend({
  async create(newTourn: Tournament, existTour: Tour, categories: Category[]) {
    return this.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.getRepository(Category).save(categories);

      const savedTournament = await transactionalEntityManager
        .getRepository(Tournament)
        .save({ ...newTourn, tour: existTour, categories });

      return savedTournament;
    });
  },

  async getAll(tourId: string) {
    return this.createQueryBuilder("t")
      .select([
        "t.id as tournamentId",
        "t.title AS tournamentName",
        "count(distinct tm.id) as teamsCount",
        "t.master as master",
        'STRING_AGG(DISTINCT CONCAT(c."gender", \'-\', c."category")::TEXT, \', \') AS "gender_category"',
      ])
      .innerJoin("tour", "tr", 'tr.id = t."tourId"')
      .innerJoin(
        "tournament_categories_category",
        "tcc",
        't.id = tcc."tournamentId"'
      )
      .innerJoin("category", "c", 'c.id = tcc."categoryId"')
      .leftJoin("team", "tm", 't.id = tm."tournamentId"')
      .where("tr.id = :tourId", { tourId })
      .andWhere('t."isDeleted" = false')
      .groupBy("t.id, t.title, t.master, c.gender, c.category")
      .getRawMany();
  },

  async getCategoryByTournId(tournId: string) {
    return this.createQueryBuilder("t")
      .select(['c."gender" || \'-\' || c."category" AS "categories"'])
      .innerJoin(
        "tournament_categories_category",
        "tcc",
        't.id = tcc."tournamentId"'
      )
      .innerJoin("category", "c", 'c.id = tcc."categoryId"')
      .where("t.id = :tournId", { tournId })
      .getRawMany();
  },

  async getWinningTeams(tournamentId: string, groupStage: string[]) {
    // Subquery to check if all matches in a group stage have a winner
    const isFinish = await AppDataSource.createQueryBuilder()
      .select(
        `CASE 
      WHEN COUNT(*) > 0 THEN TRUE 
      ELSE FALSE 
    END AS "hasIncompleteGroupStage"`
      )
      .from(
        (subquery) =>
          subquery
            .select("1")
            .from("match", "m")
            .innerJoin("team_match", "tm", '"m"."id" = "tm"."matchId"')
            .innerJoin("group_stage", "gs", '"gs"."id" = "m"."groupStageId"')
            .where('"m"."tournamentId" = :tournamentId', { tournamentId })
            .andWhere('"gs"."groupStage" IN (:...groupStages)', {
              groupStages: groupStage, // Array con 'Grupo 1', 'Grupo 2', etc.
            })
            .groupBy('"m"."groupStageId"')
            .having(
              'SUM(CASE WHEN tm."isWinner" IS TRUE THEN 0 ELSE 1 END) > 0'
            ),
        "subquery"
      )
      .getRawOne();

    const isIncomplete = isFinish?.hasIncompleteGroupStage === true;

    console.log("isIncomplet:", isIncomplete);
    if (!isIncomplete) {
      return -1;
    }

    // Subquery for team wins
    const teamWinsSubquery = AppDataSource.createQueryBuilder()
      .select('"tm"."teamId"', "teamId")
      .addSelect('"m"."groupStageId"', "groupStageId")
      .addSelect('COUNT("tm"."isWinner")', "matchesWon")
      .from("team_match", "tm")
      .innerJoin("match", "m", '"m"."id" = "tm"."matchId"')
      .where('"tm"."isWinner" = TRUE')
      .andWhere('"m"."tournamentId" = :tournamentId', { tournamentId })
      .groupBy('"tm"."teamId", "m"."groupStageId"');

    // Subquery for games difference
    const gamesDiffSubquery = AppDataSource.createQueryBuilder()
      .select('"tm"."teamId"', "teamId")
      .addSelect('"m"."groupStageId"', "groupStageId")
      .addSelect(
        `
            SUM(
                CASE
                    WHEN "tm"."teamId" = "t"."id" THEN "s"."gamesTeam1" - "s"."gamesTeam2"
                    ELSE "s"."gamesTeam2" - "s"."gamesTeam1"
                END
            )
        `,
        "gamesDiff"
      )
      .from("team_match", "tm")
      .innerJoin("match", "m", '"m"."id" = "tm"."matchId"')
      .innerJoin("set", "s", '"s"."matchId" = "m"."id"')
      .innerJoin("team", "t", '"t"."id" = "tm"."teamId"')
      .where('"m"."tournamentId" = :tournamentId', { tournamentId })
      .groupBy('"tm"."teamId", "m"."groupStageId"');

    // Main query to get the winning teams
    const winningTeams = await AppDataSource.createQueryBuilder()
      .select([
        '"tw"."groupStageId" AS "groupStageId"',
        '"tw"."teamId" AS "teamId"',
        '"tw"."matchesWon" AS "matchesWon"',
        '"sd"."gamesDiff" AS "gamesDiff"',
      ])
      .from("(" + teamWinsSubquery.getQuery() + ")", "tw")
      .innerJoin(
        "(" + gamesDiffSubquery.getQuery() + ")",
        "sd",
        '"tw"."teamId" = "sd"."teamId" AND "tw"."groupStageId" = "sd"."groupStageId"'
      )
      .where('"tw"."groupStageId" IS NOT NULL')
      .orderBy('"tw"."matchesWon"', "DESC")
      .addOrderBy('"sd"."gamesDiff"', "DESC")
      .addOrderBy('"tw"."groupStageId"')
      .setParameters({ tournamentId })
      .limit(8)
      .getRawMany();

    console.log("Wining:", winningTeams);
    return winningTeams;
  },
});
