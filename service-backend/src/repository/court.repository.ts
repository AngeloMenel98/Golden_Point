import { AppDataSource } from "../data-source";
import { Court } from "../entity";

export const CourtRepository = AppDataSource.getRepository(Court).extend({
  async getCourtByClubId(clubId: string, courtNumber: string) {
    return this.createQueryBuilder("court")
      .innerJoin("court.club", "club")
      .where('club."id" = :clubId', { clubId })
      .andWhere('court."courtNumber" = :courtNumber', { courtNumber })
      .getOne();
  },
});
