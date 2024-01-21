import { ClubService } from '../services';
import { CalendarClub, Club, Court } from '../entity';
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
        availableTo: string,
        courtsNumber: number
    ) {
        try {
            const newClub = new Club();
            newClub.clubName = clubName;
            newClub.location = location;

            const newCalClub = new CalendarClub();
            newCalClub.availableTo = availableTo;
            newCalClub.availableFrom = availableFrom;

            const newCourts: Court[] = [];

            const resp = await this.clubService.create(
                newClub,
                newCalClub,
                newCourts,
                userRole,
                tourId,
                courtsNumber
            );

            return { resp, status: 201 };
        } catch (e) {
            console.error(e);
            return {
                resp: { error: 'Error creating Club' },
                status: 500,
            };
        }
    }

    async getAll() {
        const response = await this.clubService.getAll();

        if (!response) {
            return {
                response: 'Clubs not Found',
                status: 404,
            };
        }

        return { response, status: 201 };
    }
}

export default new ClubController();
