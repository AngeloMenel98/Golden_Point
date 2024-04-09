import { validationResult } from 'express-validator';
import { Tournament } from '../entity';
import { TournamentService } from '../services';
import { Request, Response } from 'express';
import { isServiceCodeError } from '../errors/errors';

export class TournamentController {
    private tournService: TournamentService;

    constructor() {
        this.tournService = new TournamentService();
    }

    async create(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { tourId, title, master, categoryData } = req.body;

            const newTourn = new Tournament();
            newTourn.title = title;
            newTourn.master = master;

            const tournament = await this.tournService.create(
                newTourn,
                tourId,
                categoryData
            );
            const response = {
                id: tournament.id,
                title: tournament.title,
                master: tournament.master,
                categories: tournament.categories.map((c) => c.id),
            };
            res.status(201).json(response);
        } catch (e) {
            console.error('Error creating Tournament:', e);

            if (isServiceCodeError(e)) {
                res.status(400).json({ error: e.code });
                return;
            }

            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new TournamentController();
