import { AppDataSource } from "../data-source";
import { CalendarClub, Club, Court, Tour } from "../entity";

export const ClubRepository = AppDataSource.getRepository(Club).extend({
  async create(club: Club, tour: Tour, calClub: CalendarClub, court: Court[]) {
    return this.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager
        .getRepository(CalendarClub)
        .save(calClub);
      const savedClub = await transactionalEntityManager
        .getRepository(Club)
        .save({ ...club, calendarClub: calClub, tour });

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
      .addSelect(
        'STRING_AGG(DISTINCT ct."courtNumber"::TEXT, \', \') AS "courtNumbers"'
      )
      .addSelect('MIN(cc."availableFrom") AS "availableFrom"')
      .addSelect('MAX(cc."availableTo") AS "availableTo"')
      .addSelect(
        'STRING_AGG(DISTINCT c."categoryName"::TEXT, \', \') AS "categories"'
      )
      .addSelect('STRING_AGG(DISTINCT c."gender"::TEXT, \', \') AS "genders"')
      .innerJoin("court", "ct", 'ct."clubId" = cl.id')
      .innerJoin("calendar_club", "cc", 'cc.id = cl."calendarClubId"')
      .innerJoin("tour", "t", 't.id = cl."tourId"')
      .innerJoin("tournament", "trn", 'trn."tourId" = t.id')
      .innerJoin(
        "tournament_categories_category",
        "tcc",
        'tcc."tournamentId" = trn.id'
      )
      .innerJoin("category", "c", 'c.id = tcc."categoryId"')
      .where("trn.id = :tournamentId", { tournamentId })
      .groupBy('cl."clubName"')
      .getRawMany();
  },

  async getAll() {
    return this.createQueryBuilder("c")
      .select([
        "c.id AS id",
        'c."clubName"',
        'COUNT(co."courtNumber") AS courtCount',
        'cc."availableFrom"',
        'cc."availableTo"',
      ])
      .innerJoin("calendar_club", "cc", 'cc.id = c."calendarClubId"')
      .innerJoin("court", "co", 'co."clubId" = c.id')
      .groupBy(
        'c.id, cc.id, c."clubName", cc."availableFrom", cc."availableTo"'
      )
      .getRawMany();
  },
});
