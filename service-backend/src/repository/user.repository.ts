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
    perData: PersonalData,
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
    const users = await this.createQueryBuilder("u")
      .select([
        "u.id AS userId",
        "u.username AS userName",
        'pd."lastName" as lastName',
        'pd."firstName" as firstName',
      ])
      .innerJoin("personal_data", "pd", 'pd."userId" = u.id')
      .innerJoin("tour_users_user", "tuu", 'u.id = tuu."userId"')
      .innerJoin("tour", "t", 't.id = tuu."tourId"')
      .where("t.id = :tourId", { tourId })
      .getRawMany();

    return users.map(
      (u: {
        userid: string;
        username: string;
        lastname: string;
        firstname: string;
      }) => ({
        userId: u.userid,
        userName: u.username,
        firstName: u.firstname,
        lastName: u.lastname,
      }),
    );
  },

  async getUserStats(userId: string) {
    // Get all matches where user participated (via team_match -> team -> team_users)
    const matchResults = await this.createQueryBuilder()
      .select([
        "m.id as matchId",
        "tm.isWinner as isWinner",
        'm."amountTourPoints" as points',
        "trn.id as tournamentId",
      ])
      .distinct(true)
      .from("team_users_user", "tuu")
      .innerJoin("team", "t", 't.id = tuu."teamId"')
      .innerJoin("team_match", "tm", 'tm."teamId" = t.id')
      .innerJoin("match", "m", 'm.id = tm."matchId"')
      .innerJoin("set", "s", 's."matchId" = m.id')
      .innerJoin("tournament", "trn", 'trn.id = m."tournamentId"')
      .where('tuu."userId" = :userId', { userId })
      .getRawMany();

    const setResults = await this.createQueryBuilder()
      .select([
        "s.id as setId",
        "s.gamesTeam1 as gamesTeam1",
        "s.gamesTeam2 as gamesTeam2",
      ])
      .distinct(true)
      .from("set", "s")
      .innerJoin("match", "m", 'm.id = s."matchId"')
      .innerJoin("team_match", "tm1", 'tm1."matchId" = m.id')
      .innerJoin("team", "t1", 't1.id = tm1."teamId"')
      .innerJoin("team_users_user", "tuu1", 'tuu1."teamId" = t1.id')
      .innerJoin("team_match", "tm2", 'tm2."matchId" = m.id')
      .innerJoin("team", "t2", 't2.id = tm2."teamId"')
      .where('tuu1."userId" = :userId', { userId })
      //.andWhere("tm1.isWinner = true")
      .getRawMany();

    let wins = 0;
    let losses = 0;
    let totalPoints = 0;
    let gamesWon = 0;
    let gamesLost = 0;

    matchResults.forEach((match: { iswinner: boolean; points: number }) => {
      if (match.iswinner) {
        wins++;
        totalPoints += match.points;
      } else {
        losses++;
      }
    });

    setResults.forEach((set: { gamesteam1: number; gamesteam2: number }) => {
      if (set.gamesteam1 > set.gamesteam2) {
        gamesWon += set.gamesteam1;
        gamesLost += set.gamesteam2;
      } else {
        gamesWon += set.gamesteam2;
        gamesLost += set.gamesteam1;
      }
    });

    return { wins, losses, totalPoints, gamesWon, gamesLost };
  },

  async getTournamentUserStats(tourId: string, userId: string) {
    // Get matches for specific tournament
    const matchResults = await this.createQueryBuilder()
      .select([
        "m.id as matchId",
        "tm.isWinner as isWinner",
        'm."amountTourPoints" as points',
      ])
      .from("team_users_user", "tuu")
      .innerJoin("team", "t", 't.id = tuu."teamId"')
      .innerJoin("team_match", "tm", 'tm."teamId" = t.id')
      .innerJoin("match", "m", 'm.id = tm."matchId"')
      .innerJoin("tournament", "trn", 'trn.id = m."tournamentId"')
      .innerJoin("tour_users_user", "tuut", 'tuut."tourId" = trn."tourId"')
      .where('tuu."userId" = :userId', { userId })
      .andWhere('tuut."tourId" = :tourId', { tourId })
      .getRawMany();

    let wins = 0;
    let losses = 0;
    let totalPoints = 0;

    matchResults.forEach((match: { isWinner: boolean; points: number }) => {
      if (match.isWinner) {
        wins++;
        totalPoints += match.points;
      } else {
        losses++;
      }
    });

    // Get sets for this tournament
    const setResults = await this.createQueryBuilder()
      .select(["s.gamesTeam1", "s.gamesTeam2"])
      .from("set", "s")
      .innerJoin("match", "m", 'm.id = s."matchId"')
      .innerJoin("tournament", "trn", 'trn.id = m."tournamentId"')
      .innerJoin("team_match", "tm1", 'tm1."matchId" = m.id')
      .innerJoin("team", "t1", 't1.id = tm1."teamId"')
      .innerJoin("team_users_user", "tuu1", 'tuu1."teamId" = t1.id')
      .where('tuu1."userId" = :userId', { userId })
      .andWhere('trn."tourId" = :tourId', { tourId })
      .andWhere("tm1.isWinner = true")
      .getRawMany();

    let gamesWon = 0;
    let gamesLost = 0;

    setResults.forEach((set: { gamesTeam1: number; gamesTeam2: number }) => {
      if (set.gamesTeam1 > set.gamesTeam2) {
        gamesWon += set.gamesTeam1;
        gamesLost += set.gamesTeam2;
      } else {
        gamesLost += set.gamesTeam1;
        gamesWon += set.gamesTeam2;
      }
    });

    return { wins, losses, totalPoints, gamesWon, gamesLost };
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

  async getGlobalRankings() {
    return this.createQueryBuilder("u")
      .select([
        "u.id AS userId",
        "u.username AS userName",
        "t.category AS category",
        'COALESCE(SUM(m."amountTourPoints"), 0) AS totalPoints',
      ])
      .innerJoin("team_users_user", "tuu", "tuu.userId = u.id")
      .innerJoin("team", "t", "t.id = tuu.teamId")
      .innerJoin(
        "team_match",
        "tm",
        'tm."teamId" = t.id AND tm."isWinner" = true',
      )
      .innerJoin("match", "m", "m.id = tm.matchId")
      .where('u."isDeleted" = false')
      .groupBy("u.id, t.category")
      .orderBy("totalPoints", "DESC")
      .getRawMany();
  },

  async getTournamentRankings(tourId: string) {
    return this.createQueryBuilder("u")
      .select("u.id", "userId")
      .addSelect("u.username", "userName")
      .addSelect('COALESCE(SUM(m."amountTourPoints"), 0)', "points")
      .innerJoin(
        "tour_users_user",
        "tuut",
        'tuut."userId" = u.id AND tuut."tourId" = :tourId',
        { tourId },
      )
      .innerJoin("team_users_user", "tuu", 'tuu."userId" = u.id')
      .innerJoin(
        "team_match",
        "tm",
        'tm."teamId" = tuu."teamId" AND tm."isWinner" = true',
      )
      .innerJoin(
        "match",
        "m",
        'm.id = tm."matchId" AND m."tournamentId" IN (SELECT id FROM "tournament" WHERE "tourId" = :tourId)',
        { tourId },
      )
      .where('u."isDeleted" = false')
      .groupBy("u.id")
      .addGroupBy("u.username")
      .orderBy('"points"', "DESC")
      .getRawMany();
  },
});
