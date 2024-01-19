import { AppDataSource } from '../data-source';
import { Tour, User } from '../entity';
import { UserRepository } from './user.repository';

export const TourRepository = AppDataSource.getRepository(Tour).extend({
    async getUsersByTourId(tourId: string): Promise<User[]> {
        return await UserRepository.getUsersByTourId(tourId);
    },

    async getAll(): Promise<any> {
        try {
            return await this.createQueryBuilder('t')
                .select('t.title', 'tourTitle')
                .addSelect('t.tourCode', 'tourCode')
                .addSelect('COUNT(DISTINCT tuu.userId)', 'userCount')
                .addSelect('COUNT(DISTINCT tt.id)', 'tournamentCount')
                .innerJoin('tour_users_user', 'tuu', 'tuu.tourId = t.id')
                .leftJoin('user', 'u', 'tuu.userId = u.id')
                .innerJoin('tournament', 'tt', 'tt.tourId = t.id')
                .groupBy('t.id, t.title, t.tourCode')
                .getRawMany();
        } catch (error) {
            console.error('Error in getAll Tours Repository', error);
            throw error;
        }
    },
});
