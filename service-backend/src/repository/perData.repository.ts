import { AppDataSource } from '../data-source';
import { PersonalData } from '../entity';

export const PerDataRepository = AppDataSource.getRepository(
    PersonalData
).extend({});
