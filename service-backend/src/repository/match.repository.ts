import { AppDataSource } from '../data-source';
import { Match } from '../entity';

export const MatchRepository = AppDataSource.getRepository(Match).extend({});
