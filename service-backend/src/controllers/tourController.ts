import { Tour } from '../entity';
import { TourService } from '../services';
import { generateCode } from '../helpers/generateTourCode.helper';

export class TourController {
    private tourService: TourService;

    constructor() {
        this.tourService = new TourService();
    }
    async create(title: string, userId: string) {
        try {
            const newTour = new Tour();
            newTour.title = title;
            newTour.tourCode = generateCode(6);

            const resp = await this.tourService.create(newTour, userId);
            const response = {
                id: resp.id,
                title: resp.title,
                tourCode: resp.tourCode,
                usersId: resp.users.map((u) => u.id),
            };

            return { response, status: 201 };
        } catch (e) {
            console.error(e);
            return {
                response: { error: 'Error creating new Tour' },
                status: 500,
            };
        }
    }

    async joinUser(userId: string, tourCode: string) {
        try {
            const resp = await this.tourService.joinUserToTour(
                userId,
                tourCode
            );
            const response = {
                id: resp.id,
                title: resp.title,
                tourCode: resp.tourCode,
                usersId: resp.users.map((u) => u.id),
            };
            return { response, status: 201 };
        } catch (e) {
            console.error(e);
            return {
                response: { error: 'Error adding user to Tour', status: 500 },
            };
        }
    }
}

export default new TourController();
