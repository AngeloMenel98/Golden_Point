import { AppDataSource } from '../data-source';
import { PersonalData, User } from '../entity';

export const UserRepository = AppDataSource.getRepository(User).extend({
    async findByUsername(username: string): Promise<User> {
        return await this.findOne({ where: { username } });
    },

    async findUserWithPerData(
        userId: string
    ): Promise<{ user: User; personalData: PersonalData }> {
        try {
            return this.createQueryBuilder('u')
                .select('u')
                .addSelect('pd')
                .innerJoin('u.personalData', 'pd')
                .where('u.id = :userId', { userId })
                .getOne();
        } catch (error) {
            console.error(
                'Error al obtener usuario con datos personales',
                error
            );
            throw error;
        }
    },

    async getUsersByTourId(tourId: string): Promise<User[]> {
        try {
            return this.createQueryBuilder('u')
                .innerJoin('tour_users_user', 'tuu', 'u.id = tuu."userId"')
                .innerJoin('tour', 't', 't.id = tuu."tourId"')
                .where('t.id = :tourId', { tourId })
                .getMany();
        } catch (error) {
            console.error('Error al obtener usuarios del Tour', error);
            throw error;
        }
    },

    async getUsersByTeamId(teamId: string): Promise<User[]> {
        try {
            return await this.createQueryBuilder('u')
                .innerJoin('team_users_user', 'tuu', 'u.id = tuu."userId"')
                .innerJoin('team', 't', 't.id = tuu."teamId"')
                .select('u')
                .where('t.id = :teamId', { teamId })
                .getMany();
        } catch (error) {
            console.error('Error searching for users in Team', error);
            throw error;
        }
    },
});
