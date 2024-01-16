import { Request, Response } from 'express';
import { PersonalData } from '../entity';
import { PerDataService } from '../services';

export class PerDataController {
    private perDataService: PerDataService;

    constructor() {
        this.perDataService = new PerDataService();
    }

    async save(req: Request, res: Response, userId: number) {
        try {
            const { firstName, lastName, location, phoneNumber } = req.body;
            const newPerData = new PersonalData();
            newPerData.firstName = firstName;
            newPerData.lastName = lastName;
            newPerData.location = location;
            newPerData.phoneNumber = phoneNumber;

            const savedPerData = await this.perDataService.create(
                newPerData,
                userId
            );
            return res.status(201).json(savedPerData);
        } catch (e) {}
    }
}

export default new PerDataController();
