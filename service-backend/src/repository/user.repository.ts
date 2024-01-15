import { AppDataSource } from '../data-source';
import { User } from '../entity';

export const UserRepository = AppDataSource.getRepository(User).extend({
    async findByUsername(username: string): Promise<User> {
        return await this.findOne({ where: { username } });
    },
    async getUsersByTourId(tourId: number): Promise<User[]> {
        try {
            return await this.createQueryBuilder('u')
                .innerJoin('tour_users_user', 'tuu', 'u.id = tuu."userId"')
                .innerJoin('tour', 't', 't.id = tuu."tourId"')
                .where('t.id = :tourId', { tourId })
                .getMany();
        } catch (error) {
            console.error('Error al obtener usuarios del Tour', error);
            throw error;
        }
    },
});
