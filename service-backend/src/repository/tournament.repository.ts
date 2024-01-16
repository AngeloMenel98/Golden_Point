import { AppDataSource } from '../data-source';
import { Tournament } from '../entity';

export const TournamentRepository = AppDataSource.getRepository(
    Tournament
).extend({});
