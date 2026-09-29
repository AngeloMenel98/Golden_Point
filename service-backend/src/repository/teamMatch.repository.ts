import { AppDataSource } from "../data-source";
import { TeamMatch } from "../entity";

export const TeamMatchRepository = AppDataSource.getRepository(
  TeamMatch,
).extend({
  async findByMatchAndPosition(
    matchId: string,
    position: number,
  ): Promise<TeamMatch | null> {
    return this.createQueryBuilder("teamMatch")
      .innerJoin("teamMatch.match", "match")
      .innerJoinAndSelect("teamMatch.team", "team")
      .leftJoinAndSelect("team.users", "users")
      .where("match.id = :matchId", { matchId })
      .andWhere("teamMatch.position = :position", { position })
      .getOne();
  },
});
