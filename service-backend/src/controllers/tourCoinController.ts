import { Request, Response } from 'express';
import { TourCoin } from '../entity';
import { TourCoinService } from '../services';
import { validate } from 'class-validator';

export class PerDataController {
    private tourCoinService: TourCoinService;

    constructor() {
        this.tourCoinService = new TourCoinService();
    }
}

export default new PerDataController();
