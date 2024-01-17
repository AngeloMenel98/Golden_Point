import { AppDataSource } from '../data-source';
import { Club } from '../entity';

export const ClubRepository = AppDataSource.getRepository(Club).extend({});
