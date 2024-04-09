import { Tour } from '../entity';
import { TourService } from '../services';
import { generateCode } from '../helpers/generateTourCode.helper';
import { Request, Response, response } from 'express';
import { validationResult } from 'express-validator';
import {
    isServiceCodeError,
    isTourServiceError,
    isUserServiceError,
} from '../errors/errors';

export class TourController {
    private tourService: TourService;

    constructor() {
        this.tourService = new TourService();
    }
    async create(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, userId } = req.body;

            const newTour = new Tour();
            newTour.title = title;
            newTour.tourCode = generateCode(6);

            const tour = await this.tourService.create(newTour, userId);

            const response = {
                id: tour.id,
                title: tour.title,
                tourCode: tour.tourCode,
                isDeleted: tour.isDeleted,
                usersId: tour.users.map((u) => u.id),
            };

            res.status(201).json(response);
        } catch (e) {
            console.error('Error creating tour:', e);

            if (isTourServiceError(e)) {
                res.status(400).json({ error: e.message });
                return;
            }

            if (isUserServiceError(e)) {
                res.status(400).json({ error: 'User ID does not exist' });
                return;
            }

            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { tourId } = req.body;
            const existingTour = await this.tourService.findById(tourId);

            const tour = await this.tourService.delete(existingTour);

            const response = {
                id: tour.id,
                title: tour.title,
                tourCode: tour.tourCode,
                isDeleted: tour.isDeleted,
            };

            res.status(201).json(response);
        } catch (e) {
            console.error('Error creating tour:', e);

            if (isTourServiceError(e)) {
                res.status(400).json({ error: e.message });
                return;
            }

            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async joinUser(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { userId, tourCode } = req.body;

            const tour = await this.tourService.joinUserToTour(
                userId,
                tourCode
            );

            const response = {
                id: tour.id,
                title: tour.title,
                tourCode: tour.tourCode,
                usersId: tour.users.map((u) => u.id),
            };
            res.status(201).json(response);
        } catch (e) {
            console.error('Error creating tour:', e);

            if (isTourServiceError(e)) {
                res.status(400).json({ error: e.message });
                return;
            }

            if (isUserServiceError(e)) {
                res.status(400).json({ error: 'User ID does not exist' });
                return;
            }

            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const tours = await this.tourService.getAll();

            res.status(201).json(tours);
        } catch (e) {
            console.error('Error creating tour:', e);

            if (isServiceCodeError(e)) {
                res.status(400).json({ error: e.code });
                return;
            }

            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new TourController();
