import { Request, Response } from 'express';
import { PersonalData } from '../entity';
import { PerDataService } from '../services';
import { validate } from 'class-validator';

export class PerDataController {
    private perDataService: PerDataService;

    constructor() {
        this.perDataService = new PerDataService();
    }
}

export default new PerDataController();
