import { Request, Response } from 'express';
import { Tournament } from '../entity';
import { TournamentService } from '../services';

export class TournamentController {
    private tournService: TournamentService;

    constructor() {
        this.tournService = new TournamentService();
    }

    async create(req: Request, res: Response) {
        try {
            const { title, master, tourId } = req.body;

            const newTourn = new Tournament();
            newTourn.title = title;
            newTourn.master = master;

            const savedTourn = await this.tournService.create(newTourn, tourId);
            return res.status(201).json(savedTourn);
        } catch (err) {
            console.error('Error al crear nuevo Tour', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new TournamentController();
