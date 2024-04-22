import { AppDataSource } from "../data-source";
import { Team } from "../entity";

export const TeamRepository = AppDataSource.getRepository(Team).extend({
  async getTeams(tournamentId: string) {
    return this.createQueryBuilder("tm")
      .select('tm."teamName"', "teamName")
      .addSelect('tm."category"', "category")
      .innerJoin("team_users_user", "tuu", 'tuu."teamId" = tm.id ')
      .innerJoin("user", "u", 'u.id = tuu."userId"')
      .innerJoin("tour_users_user", "tuu2", 'tuu2."userId" = u.id ')
      .innerJoin("tour", "t", 't.id = tuu2."tourId" ')
      .innerJoin("tournament", "trn", 'trn."tourId" = t.id')
      .where("trn.id = :tournamentId", { tournamentId })
      .groupBy('tm."category",tm."teamName"')
      .getRawMany();
  },
});
