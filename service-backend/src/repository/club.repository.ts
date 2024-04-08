import { AppDataSource } from '../data-source';
import { CalendarClub, Club, Court, Tour } from '../entity';

export const ClubRepository = AppDataSource.getRepository(Club).extend({
    async create(
        club: Club,
        tour: Tour,
        calClub: CalendarClub,
        court: Court[]
    ) {
        return this.manager.transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager
                .getRepository(CalendarClub)
                .save(calClub);
            const savedClub = await transactionalEntityManager
                .getRepository(Club)
                .save({ ...club, calendarClub: calClub, tour });

            await transactionalEntityManager.getRepository(Court).save(
                court.map((courtInstance) => ({
                    ...courtInstance,
                    club: savedClub,
                }))
            );

            return savedClub;
        });
    },

    async getAll() {
        return this.createQueryBuilder('c')
            .select([
                'c.id AS id',
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
    },
});
