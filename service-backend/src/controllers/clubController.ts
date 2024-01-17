import { Request, Response } from 'express';
import { ClubService } from '../services';
import { Club } from '../entity';

export class ClubController {
    private clubService: ClubService;

    constructor() {
        this.clubService = new ClubService();
    }

    async save(req: Request, res: Response) {
        try {
            const { clubName, tourId, location, userRole } = req.body;

            const newClub = new Club();
            newClub.clubName = clubName;
            newClub.location = location;

            const savedClub = await this.clubService.create(
                newClub,
                userRole,
                tourId
            );

            return res.status(201).json(savedClub);
        } catch (error) {
            console.error('Error al crear club:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new ClubController();
