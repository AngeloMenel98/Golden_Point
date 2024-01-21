import { CourtRepository } from '../repository';
import { Club, Court } from '../entity';

export class CourtService {
    async create(
        newCourts: Court[],
        club: Club,
        courtsNumber: number
    ): Promise<Court[]> {
        try {
            for (let i = 0; i < courtsNumber; i = i + 1) {
                const newCourt = new Court();
                newCourt.courtNumber = i + 1;
                newCourt.club = club;

                newCourts.push(newCourt);
            }

            return CourtRepository.save(newCourts);
        } catch (err) {
            console.error('Error creating Courts:', err);
        }
    }

    async findById(courtId: any): Promise<Court> {
        try {
            const existingCourt = await CourtRepository.findOneBy({
                id: courtId,
            });

            if (existingCourt) {
                return existingCourt;
            }
        } catch (err) {
            console.error('Error finding user by ID', courtId);
            return undefined;
        }
    }
}
