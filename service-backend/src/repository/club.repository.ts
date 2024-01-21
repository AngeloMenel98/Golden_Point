import { AppDataSource } from '../data-source';
import { Club } from '../entity';

export const ClubRepository = AppDataSource.getRepository(Club).extend({
    async getAll(): Promise<any> {
        try {
            return this.createQueryBuilder('c')
                .select([
                    'c."clubName"',
                    'COUNT(co."courtNumber") AS courtCount',
                    'cc."availableFrom"',
                    'cc."availableTo"',
                ])
                .innerJoin('calendar_club', 'cc', 'cc.id = c."calendarClubId"')
                .innerJoin('court', 'co', 'co."clubId" = c.id')
                .groupBy(
                    'c.id, cc.id, c."clubName", cc."availableFrom", cc."availableTo"'
                )
                .getRawMany();
        } catch (error) {
            console.error('Error in getAll Club', error);
            throw error;
        }
    },
});
