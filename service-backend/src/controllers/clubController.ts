import { ClubService } from '../services';
import { CalendarClub, Club } from '../entity';
import { UserRole } from '../entity/User';

export class ClubController {
    private clubService: ClubService;

    constructor() {
        this.clubService = new ClubService();
    }

    async create(
        clubName: string,
        tourId: string,
        location: string,
        userRole: UserRole,
        availableFrom: string,
        availableTo: string
    ) {
        try {
            const newClub = new Club();
            newClub.clubName = clubName;
            newClub.location = location;

            const newCalClub = new CalendarClub();
            newCalClub.availableTo = availableTo;
            newCalClub.availableFrom = availableFrom;

            const resp = await this.clubService.create(
                newClub,
                newCalClub,
                userRole,
                tourId
            );

            return { resp, status: 201 };
        } catch (e) {
            console.error(e);
            return {
                response: { error: 'Error creating Club' },
                status: 500,
            };
        }
    }
}

export default new ClubController();
