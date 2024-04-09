import { UserRepository } from '.';
import { AppDataSource } from '../data-source';
import { Team, User } from '../entity';

export const TeamRepository = AppDataSource.getRepository(Team).extend({});
