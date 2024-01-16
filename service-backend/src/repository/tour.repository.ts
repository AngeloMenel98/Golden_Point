import { AppDataSource } from '../data-source';
import { Tour } from '../entity';

export const TourRepository = AppDataSource.getRepository(Tour).extend({});
