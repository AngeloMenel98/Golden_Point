import { AppDataSource } from '../data-source';
import { Tour, User } from '../entity';
import { UserRepository } from './user.repository';

export const TourRepository = AppDataSource.getRepository(Tour).extend({
    async getUsersByTourId(tourId: string): Promise<User[]> {
        return await UserRepository.getUsersByTourId(tourId);
    },
});
