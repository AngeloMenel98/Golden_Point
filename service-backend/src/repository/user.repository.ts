import { AppDataSource } from "../data-source";
import { PersonalData, TourCoin, User } from "../entity";

export const UserRepository = AppDataSource.getRepository(User).extend({
  async create(user: User, perData: PersonalData, tourCoin: TourCoin) {
    return this.manager.transaction(async (transactionalEntityManager) => {
      const savedUser = await transactionalEntityManager
        .getRepository(User)
        .save(user);
      await transactionalEntityManager
        .getRepository(PersonalData)
        .save({ ...perData, user: savedUser });
      await transactionalEntityManager
        .getRepository(TourCoin)
        .save({ ...tourCoin, user: savedUser });
      return savedUser;
    });
  },

  async update(
    existingUser: User,
    existingPerData: PersonalData,
    user: User,
    perData: PersonalData
  ) {
    return this.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager
        .getRepository(User)
        .merge(existingUser, user);
      const savedUser = await transactionalEntityManager
        .getRepository(User)
        .save(existingUser);

      await transactionalEntityManager
        .getRepository(PersonalData)
        .merge(existingPerData, perData);
      await transactionalEntityManager
        .getRepository(PersonalData)
        .save(existingPerData);

      return savedUser;
    });
  },

  async findByUsername(username: string) {
    return this.findOne({ where: { username } });
  },

  async findByEmail(email: string) {
    return this.findOne({ where: { email } });
  },

  async findUserWithPerData(userId: string) {
    return this.createQueryBuilder("u")
      .select("u")
      .addSelect("pd")
      .innerJoin("u.personalData", "pd")
      .where("u.id = :userId", { userId })
      .getOne();
  },

  async findUserInTour(userId: string, tourCode: string) {
    return this.createQueryBuilder("u")
      .innerJoin("tour_users_user", "tuu", 'u.id = tuu."userId"')
      .innerJoin("tour", "t", 't.id = tuu."tourId"')
      .where("u.id = :userId", { userId })
      .andWhere("t.tourCode = :tourCode", { tourCode })
      .getOne();
  },

  async getUsersByTourId(tourId: string) {
    return this.createQueryBuilder("u")
      .innerJoin("tour_users_user", "tuu", 'u.id = tuu."userId"')
      .innerJoin("tour", "t", 't.id = tuu."tourId"')
      .where("t.id = :tourId", { tourId })
      .getMany();
  },

  async getUsersByTeamId(teamId: string): Promise<User[]> {
    return this.createQueryBuilder("u")
      .innerJoin("team_users_user", "tuu", 'u.id = tuu."userId"')
      .innerJoin("team", "t", 't.id = tuu."teamId"')
      .select("u")
      .where("t.id = :teamId", { teamId })
      .getMany();
  },

  async getAll(tourId: string) {
    return this.createQueryBuilder("u")
      .select([
        "u.id AS userId",
        "u.username AS userName",
        "u.email as email",
        "u.isSingle as isSingle",
        'pd."lastName" as lastName',
        'pd."firstName" as firstName',
        'pd."phoneNumber" as phoneNumber',
        'pd."location" as location',
      ])
      .innerJoin("personal_data", "pd", 'pd."userId" = u.id')
      .innerJoin("tour_users_user", "tuu", 'u.id = tuu."userId"')
      .innerJoin("tour", "t", 't.id = tuu."tourId"')
      .where("t.id = :tourId", { tourId })
      .getRawMany();
  },

  async getRanking(tourId: string, category: string) {
    return this.createQueryBuilder("u")
      .select([
        "u.id AS id",
        "pd.lastName AS lastName",
        "pd.firstName AS firstName",
        "SUM(m.amountTourPoints) AS totalPoints",
      ])
      .innerJoin("personal_data", "pd", "pd.userId = u.id")
      .innerJoin("team_users_user", "tuu", "tuu.userId = u.id")
      .innerJoin("team", "t", "t.id = tuu.teamId")
      .innerJoin("team_match", "tm", "tm.teamId = t.id")
      .innerJoin("match", "m", "m.id = tm.matchId")
      .innerJoin("tournament", "trn", "trn.id = t.tournamentId")
      .innerJoin("tour_users_user", "ttt", "ttt.userId = u.id")
      .innerJoin("tour", "t2", "t2.id = ttt.tourId")
      .where("tm.isWinner = :isWinner", { isWinner: true })
      .andWhere("t2.id = :tourId", { tourId })
      .andWhere("t.category = :category", { category })
      .groupBy("u.id, pd.lastName, pd.firstName")
      .orderBy("totalPoints", "DESC")
      .getRawMany();
  },
});
