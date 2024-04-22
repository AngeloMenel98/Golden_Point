import { UserRepository } from ".";
import { AppDataSource } from "../data-source";
import { Team, User } from "../entity";

export const TeamRepository = AppDataSource.getRepository(Team).extend({
  async getTeams(tournamentId: string) {
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
});
