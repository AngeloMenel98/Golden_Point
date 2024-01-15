import { AppDataSource } from '../data-source';
import { Tour, User } from '../entity';

export const TourRepository = AppDataSource.getRepository(Tour).extend({});
