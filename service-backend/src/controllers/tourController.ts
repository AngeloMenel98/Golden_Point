import { Request, Response } from 'express';
import { Tour } from '../entity';
import { TourService } from '../services';
import { generateCode } from '../helpers/generateTourCode.helper';

export class TourController {
    private tourService: TourService;

    constructor() {
        this.tourService = new TourService();
    }
    async create(req: Request, res: Response) {
        try {
            const { title, userId } = req.body;

            const newTour = new Tour();
            newTour.title = title;
            newTour.tourCode = generateCode(6);

            const savedTour = await this.tourService.create(newTour, userId);
            return res.status(201).json(savedTour);
        } catch (err) {
            console.error('Error al crear nuevo Tour', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async joinUser(req: Request, res: Response) {
        try {
            const { userId, tourCode } = req.body;

            const savedTour = await this.tourService.joinUserToTour(
                userId,
                tourCode
            );
            return res.status(201).json(savedTour);
        } catch (err) {
            console.error('Error al agregar usuario al Tour', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new TourController();
