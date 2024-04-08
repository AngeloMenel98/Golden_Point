import { AppDataSource } from '../data-source';
import { Court, Match, Team, Tournament } from '../entity';

export const MatchRepository = AppDataSource.getRepository(Match).extend({});
