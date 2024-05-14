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
      ])
      .innerJoin("tour", "tr", 'tr.id = t."tourId"')
      .leftJoin("team", "tm", 't.id = tm."tournamentId"')
      .where("tr.id = :tourId", { tourId })
      .groupBy("t.id, t.title, t.master")
      .getRawMany();
  },
});
