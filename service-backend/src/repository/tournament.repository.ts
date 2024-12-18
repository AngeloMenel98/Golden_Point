import { fail } from "assert";
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
        "t.status as status",
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
      .orderBy(`CASE WHEN t.status = 'inProgress' THEN 0 ELSE 1 END`, "ASC")
      .addOrderBy("t.id", "DESC")
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
    const groupStagesString = `'${groupStage.join("','")}'`;

    const matchesQ = await AppDataSource.createQueryBuilder()
      .select(
        ` COUNT(distinct m.id) as matches,
          COUNT(CASE WHEN tm."isWinner" = true THEN 1 END) total_wins`
      )
      .from("match", "m")
      .innerJoin("team_match", "tm", '"m"."id" = "tm"."matchId"')
      .innerJoin("group_stage", "gs", '"gs"."id" = "m"."groupStageId"')
      .where('"m"."tournamentId" = :tournamentId', { tournamentId })
      .andWhere(`gs.groupStage IN (${groupStagesString})`)
      .getRawOne();

    if (matchesQ?.matches != matchesQ?.total_wins) {
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

    return winningTeams;
  },

  async updateStatus(tournamentId: string, status: string) {
    return this.createQueryBuilder()
      .update(Tournament)
      .set({ status })
      .where("id = :tournamentId", { tournamentId })
      .execute();
  },

  async getMyTournaments(userId: string) {
    return this.createQueryBuilder("t")
      .select([
        "t.id as tournamentId",
        "t.title as tournamentName",
        "tm.category as teamCategory",
        "m.matchDate as matchDate",
        "tm.teamName as teamName",
        "opp_tm.teamName as oppTeamName",
        "gs.groupStage as groupStage",
      ])
      .innerJoin("team", "tm", 't.id = tm."tournamentId"')
      .innerJoin("team_users_user", "tuu", 'tuu."teamId" = tm.id')
      .innerJoin("user", "u", 'tuu."userId" = u.id')
      .innerJoin("tour_users_user", "utu", 'utu."userId" = u.id')
      .innerJoin("tour", "tor", 'utu."tourId" = tor.id ')
      .innerJoin("team_match", "tm2", 'tm2."teamId" = tm.id')
      .innerJoin("match", "m", 'tm2."matchId" = m.id')
      .innerJoin("group_stage", "gs", 'gs.id = m."groupStageId"')
      .innerJoin(
        "team_match",
        "opp_tm2",
        'opp_tm2."matchId" = m.id AND opp_tm2."teamId" != tm.id'
      )
      .innerJoin("team", "opp_tm", 'opp_tm2."teamId" = opp_tm.id')
      .where("u.id = :userId", {
        userId,
      })
      .andWhere("t.status = :status", { status: "inProgress" })
      .andWhere("tm2.isWinner = :isWinner", { isWinner: false })
      .andWhere("opp_tm2.isWinner = :isWinner", { isWinner: false })
      .andWhere("tor.isDeleted = :isDeleted", { isDeleted: false })
      .groupBy([
        "t.id",
        "t.title",
        "tm.category",
        'm."matchDate"',
        'tm."teamName"',
        'opp_tm."teamName"',
        'gs."groupStage"',
      ])
      .getRawMany();
  },
});
