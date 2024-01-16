import { AppDataSource } from '../data-source';
import { Team } from '../entity';

export const TeamRepository = AppDataSource.getRepository(Team).extend({});
