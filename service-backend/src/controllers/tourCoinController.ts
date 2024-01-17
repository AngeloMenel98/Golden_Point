import { Request, Response } from 'express';
import { TourCoin } from '../entity';
import { TourCoinService } from '../services';
import { validate } from 'class-validator';

export class PerDataController {
    private tourCoinService: TourCoinService;

    constructor() {
        this.tourCoinService = new TourCoinService();
    }

    async save(req: Request, res: Response, userId: number) {
        try {
            const { coins } = req.body;
            const newTourCoin = new TourCoin();
            newTourCoin.coins = coins;
            const savedTourCoin = await this.tourCoinService.create(
                newTourCoin,
                userId
            );
            return res.status(201).json(savedTourCoin);
        } catch (e) {
            console.error('Error al guardar tourCoin:', e);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new PerDataController();
