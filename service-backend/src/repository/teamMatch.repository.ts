import { AppDataSource } from "../data-source";
import { TeamMatch } from "../entity";

export const TeamMatchRepository = AppDataSource.getRepository(
  TeamMatch
).extend({});
