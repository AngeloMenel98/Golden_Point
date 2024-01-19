import { Set } from '../entity';
import { SetService } from '../services';
import { validate } from 'class-validator';

export class MatchController {
    private setService: SetService;

    constructor() {
        this.setService = new SetService();
    }

    async create(gamesTeam1: number, gamesTeam2: number, matchId: string) {
        try {
            const newSet = new Set();
            newSet.gamesTeam1 = gamesTeam1;
            newSet.gamesTeam2 = gamesTeam2;

            const resp = await this.setService.create(newSet, matchId);
            return { resp, status: 201 };
        } catch (e) {
            console.error(e);
            return {
                resp: { error: 'Error creating new Set' },
                status: 500,
            };
        }
    }
}

export default new MatchController();
