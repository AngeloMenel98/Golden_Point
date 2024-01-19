import { CalendarClubRepository } from '../repository';
import { CalendarClub } from '../entity';

export class CalendarClubService {
    async create(newCalClub: CalendarClub): Promise<CalendarClub> {
        try {
            return await CalendarClubRepository.save(newCalClub);
        } catch (e) {
            console.error('Error creating club', e);
        }
    }
}
