import { ClubRepository } from '../repository';
import { CalendarClub, Club, Court } from '../entity';
import { UserRole } from '../entity/User';
import { TourService } from '.';
import { ServiceCodeError } from '../errors/errorsClass';

export class ClubService {
    private tourService: TourService;

    constructor() {
        this.tourService = new TourService();
    }

    async create(
        newClub: Club,
        newCalClub: CalendarClub,
        userRole: string,
        tourId: string,
        courtsNumber: number
    ) {
        const existingTour = await this.tourService.findById(tourId);

        if (userRole != UserRole.ADMIN) {
            throw new ServiceCodeError('User is not ADMIN', 'ClubS-2');
        }
        const newCourts: Court[] = [];
        for (let i = 0; i < courtsNumber; i = i + 1) {
            const newCourt = new Court();
            newCourt.courtNumber = i + 1;

            newCourts.push(newCourt);
        }

        return ClubRepository.create(
            newClub,
            existingTour,
            newCalClub,
            newCourts
        );
    }

    async getAll() {
        const existingClubs = await ClubRepository.getAll();

        if (!existingClubs) {
            throw new ServiceCodeError('There is any Club created', 'ClubS-1');
        }

        return existingClubs;
    }
}
