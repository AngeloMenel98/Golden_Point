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
});
