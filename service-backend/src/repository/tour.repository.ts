import { AppDataSource } from '../data-source';
import { Tour, User } from '../entity';
import { UserRepository } from './user.repository';

export const TourRepository = AppDataSource.getRepository(Tour).extend({
    async joinUser(user: User, tour: Tour) {
        return this.manager.transaction(async (transactionalEntityManager) => {
            const usersInTour = await UserRepository.getUsersByTourId(tour.id);

            const savedTour = await transactionalEntityManager
                .getRepository(Tour)
                .save({
                    ...tour,
                    users: [...usersInTour, user],
                });

            return savedTour;
        });
    },

    async getAll() {
        try {
            return await this.createQueryBuilder('t')
                .select([
                    't.title AS tourTitle',
                    't.tourCode AS tourCode',
                    'COUNT(DISTINCT tuu.userId) AS userCount',
                    'COUNT(DISTINCT tt.id) AS tournamentCount',
                ])
                .innerJoin('tour_users_user', 'tuu', 'tuu.tourId = t.id')
                .leftJoin('user', 'u', 'tuu.userId = u.id')
                .leftJoin('tournament', 'tt', 'tt.tourId = t.id')
                .where('t."isDeleted" = false')
                .groupBy('t.id, t.title, t.tourCode')
                .getRawMany();
        } catch (error) {
            console.error('Error in getAll Tours Repository', error);
            throw error;
        }
    },
});
