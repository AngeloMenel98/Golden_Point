import { AppDataSource } from '../data-source';
import { Set } from '../entity';

export const SetRepository = AppDataSource.getRepository(Set).extend({
    async getSetsByMatchId(matchId: string): Promise<Set[]> {
        try {
            return await this.createQueryBuilder('s')
                .innerJoin('match', 'm', 'm.id = s."matchId"')
                .where('m.id = :matchId', { matchId })
                .getMany();
        } catch (error) {
            console.error('Error getting Sets of Match', error);
            throw error;
        }
    },
});
