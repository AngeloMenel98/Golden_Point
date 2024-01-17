import { Request, Response } from 'express';
import { PersonalData } from '../entity';
import { PerDataService } from '../services';
import { validate } from 'class-validator';

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

            const errors = await validate(newPerData);
            if (errors.length > 0) {
                console.log('Validation failed. Errors:', errors);
                return res.status(400).json(errors);
            } else {
                const savedPerData = await this.perDataService.create(
                    newPerData,
                    userId
                );

                return res.status(201).json(savedPerData);
            }
        } catch (e) {
            console.error('Error al guardar personal data:', e);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new PerDataController();
