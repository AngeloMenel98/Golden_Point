import { ClubRepository } from '../repository';
import { Club } from '../entity';
import { UserRole } from '../entity/User';
import { TourService } from './tourService';

export class ClubService {
    private tourService: TourService;
    constructor() {
        this.tourService = new TourService();
    }
    async create(
        newClub: Club,
        userRole: string,
        tourId: string
    ): Promise<Club | undefined> {
        try {
            const existingTour = await this.tourService.findById(tourId);

            if (existingTour && userRole == UserRole.SUPERADMIN) {
                newClub.tour = existingTour;
                return await ClubRepository.save(newClub);
            }
            console.log('Club not created');
        } catch (e) {
            console.error('Error creating club', e);
        }
    }
}
