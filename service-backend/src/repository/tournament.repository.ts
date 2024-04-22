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
});
