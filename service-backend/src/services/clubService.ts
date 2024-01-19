import { ClubRepository } from '../repository';
import { CalendarClub, Club } from '../entity';
import { UserRole } from '../entity/User';
import { TourService, CalendarClubService } from '.';

export class ClubService {
    private tourService: TourService;
    private calendarClubService: CalendarClubService;

    constructor() {
        this.tourService = new TourService();
        this.calendarClubService = new CalendarClubService();
    }
    async create(
        newClub: Club,
        newCalClub: CalendarClub,
        userRole: string,
        tourId: string
    ): Promise<Club> {
        try {
            const existingTour = await this.tourService.findById(tourId);

            if (existingTour && userRole == UserRole.SUPERADMIN) {
                newClub.tour = existingTour;
                newClub.calendarClub = newCalClub;

                this.calendarClubService.create(newCalClub);

                return await ClubRepository.save(newClub);
            }
            console.log('Club not created');
        } catch (e) {
            console.error('Error creating club', e);
        }
    }
}
