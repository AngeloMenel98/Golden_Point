import { AppDataSource } from '../data-source';
import { CalendarClub } from '../entity';

export const CalendarClubRepository = AppDataSource.getRepository(
    CalendarClub
).extend({});
