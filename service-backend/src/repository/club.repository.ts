import { AppDataSource } from "../data-source";
import { CalendarClub, Club, Court, Tour } from "../entity";

export const ClubRepository = AppDataSource.getRepository(Club).extend({
  async create(club: Club, calClub: CalendarClub, court: Court[]) {
    return this.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager
        .getRepository(CalendarClub)
        .save(calClub);
      const savedClub = await transactionalEntityManager
        .getRepository(Club)
        .save({ ...club, calendarClub: calClub });

      await transactionalEntityManager.getRepository(Court).save(
        court.map((courtInstance) => ({
          ...courtInstance,
          club: savedClub,
        }))
      );

      return savedClub;
    });
  },

  async getClubs(tournamentId: string) {
    return this.createQueryBuilder("cl")
      .select("cl.clubName", "clubName")
      .addSelect("trn.master", "master")
      .addSelect('STRING_AGG(DISTINCT ct."id"::TEXT, \', \') AS "courtNumbers"')
      .addSelect('MIN(cc."availableFrom") AS "availableFrom"')
      .addSelect('MAX(cc."availableTo") AS "availableTo"')
      .addSelect(
        'STRING_AGG(DISTINCT CONCAT(c."gender", \'-\', c."category")::TEXT, \', \') AS "categories"'
      )
      .innerJoin("court", "ct", 'ct."clubId" = cl.id')
      .innerJoin("calendar_club", "cc", 'cc.id = cl."calendarClubId"')
      .innerJoin("tour_clubs_club", "tclc", 'tclc."clubId" = cl.id')
      .innerJoin("tour", "t", 't.id = tclc."tourId"')
      .innerJoin("tournament", "trn", 'trn."tourId" = t.id')
      .innerJoin(
        "tournament_categories_category",
        "tcc",
        'tcc."tournamentId" = trn.id'
      )
      .innerJoin("category", "c", 'c.id = tcc."categoryId"')
      .where("trn.id = :tournamentId", { tournamentId })
      .groupBy('cl."clubName",trn."master"')
      .getRawMany();
  },

  async getAll(userId: string) {
    return this.createQueryBuilder("c")
      .select([
        "c.id AS id",
        'c."clubName"',
        'c."location" AS address',
        'COUNT(distinct co."courtNumber") AS courtCount',
        'cc."availableFrom"',
        'cc."availableTo"',
      ])
      .innerJoin("calendar_club", "cc", 'cc.id = c."calendarClubId"')
      .innerJoin("court", "co", 'co."clubId" = c.id')
      .innerJoin("tour_clubs_club", "tcc", 'tcc."clubId" = c.id')
      .innerJoin("tour", "t", 'tcc."tourId" = t.id')
      .innerJoin("tour_users_user", "tuu", 'tuu."tourId" = t.id')
      .innerJoin("user", "u", 'u.id = tuu."userId"')
      .where("u.id = :userId", {
        userId,
      })
      .groupBy(
        'c.id, c."clubName", c."location", cc."availableFrom", cc."availableTo"'
      )
      .getRawMany();
  },

  async getClubsPerTour(userId: string, tourId: string) {
    return this.createQueryBuilder("c")
      .select([
        "c.id AS id",
        'c."clubName"',
        'c."location" AS address',
        'COUNT(distinct co."courtNumber") AS courtCount',
        'cc."availableFrom"',
        'cc."availableTo"',
      ])
      .innerJoin("calendar_club", "cc", 'cc.id = c."calendarClubId"')
      .innerJoin("court", "co", 'co."clubId" = c.id')
      .innerJoin("tour_clubs_club", "tcc", 'tcc."clubId" = c.id')
      .innerJoin("tour", "t", 'tcc."tourId" = t.id')
      .innerJoin("tour_users_user", "tuu", 'tuu."tourId" = t.id')
      .innerJoin("user", "u", 'u.id = tuu."userId"')
      .where("u.id = :userId", {
        userId,
      })
      .andWhere("t.id = :tourId", { tourId })
      .groupBy(
        'c.id, c."clubName", c."location", cc."availableFrom", cc."availableTo"'
      )
      .getRawMany();
  },
});
