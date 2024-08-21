import { AppDataSource } from "../data-source";
import { Club, Tour, User } from "../entity";
import { UserRepository } from "./user.repository";

export const TourRepository = AppDataSource.getRepository(Tour).extend({
  async create(tour: Tour, user: User, clubs: Club[]) {
    return this.manager.transaction(async (transactionalEntityManager) => {
      const savedTour = await transactionalEntityManager
        .getRepository(Tour)
        .save(tour);

      savedTour.users = [user];
      savedTour.clubs = clubs;

      // Guardar el tour actualizado
      await transactionalEntityManager.getRepository(Tour).save(savedTour);
      return savedTour;
    });
  },

  async joinUser(user: User, tour: Tour) {
    return this.manager.transaction(async (transactionalEntityManager) => {
      const usersInTour = await UserRepository.getUsersByTourId(tour.id);

      const savedTour = await transactionalEntityManager
        .getRepository(Tour)
        .save({
          ...tour,
          users: [...usersInTour, user],
        });

      return savedTour;
    });
  },

  async getAll(userId: string) {
    return this.createQueryBuilder("t")
      .select([
        "t.id AS tourId",
        "t.title AS tourTitle",
        "t.tourCode AS tourCode",
        '(SELECT COUNT(DISTINCT tuu."userId") FROM tour_users_user tuu WHERE tuu."tourId" = t."id") AS userCount',
        '(SELECT COUNT(DISTINCT tt.id) FROM tournament tt WHERE tt.tourId = t.id AND tt."isDeleted" = false) AS tournamentCount',
        '(SELECT u.username FROM tour_users_user tuu2 LEFT JOIN "user" u ON tuu2."userId" = u."id" WHERE tuu2."tourId" = t."id" LIMIT 1) AS firstUserName',
      ])
      .leftJoin("tournament", "tt", "tt.tourId = t.id")
      .innerJoin("tour_users_user", "tuu", "tuu.tourId = t.id")
      .where('t."isDeleted" = false')
      .andWhere("tuu.userId = :userId", { userId })
      .groupBy("t.id, t.title, t.tourCode")
      .getRawMany();
  },
});
