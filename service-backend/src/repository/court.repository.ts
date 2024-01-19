import { AppDataSource } from '../data-source';
import { Court } from '../entity';

export const CourtRepository = AppDataSource.getRepository(Court).extend({});
