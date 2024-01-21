import { ClubRepository } from '../repository';
import { CalendarClub, Club, Court } from '../entity';
import { UserRole } from '../entity/User';
import { TourService, CalendarClubService, CourtService } from '.';

export class ClubService {
    private tourService: TourService;
    private calendarClubService: CalendarClubService;
    private courtService: CourtService;

    constructor() {
        this.tourService = new TourService();
        this.calendarClubService = new CalendarClubService();
        this.courtService = new CourtService();
    }

    async create(
        newClub: Club,
        newCalClub: CalendarClub,
        newCourts: Court[],
        userRole: string,
        tourId: string,
        courtsNumber: number
    ): Promise<Club> {
        try {
            const existingTour = await this.tourService.findById(tourId);

            if (existingTour.success && userRole == UserRole.SUPERADMIN) {
                newClub.tour = existingTour.tour;
                newClub.calendarClub = newCalClub;

                this.calendarClubService.create(newCalClub);
                const savedClub = await ClubRepository.save(newClub);
                this.courtService.create(newCourts, newClub, courtsNumber);

                return savedClub;
            }
        } catch (e) {
            console.error('Error creating club in Service', e);
        }
    }

    async getAll(): Promise<Club> {
        try {
            const existingTours = await ClubRepository.getAll();
            return existingTours;
        } catch (e) {
            console.error(e);
        }
    }
}
