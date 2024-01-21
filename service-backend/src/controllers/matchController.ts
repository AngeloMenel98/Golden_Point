import { Match } from '../entity';
import { MatchService } from '../services';
import { validate } from 'class-validator';

export class MatchController {
    private matchService: MatchService;

    constructor() {
        this.matchService = new MatchService();
    }

    async create(
        amountTourPoints: number,
        amountTourCoins: number,
        matchDate: string,
        teamIds: string[],
        tournamentId: string,
        courtId: string
    ) {
        try {
            const newMatch = new Match();
            newMatch.amountTourCoins = amountTourCoins;
            newMatch.amountTourPoints = amountTourPoints;
            newMatch.matchDate = matchDate;

            const matchErrors = await validate(newMatch);

            if (matchErrors.length > 0) {
                console.log('Validation failed. Errors:', matchErrors);
                return { response: { error: 'Validation error' }, status: 400 };
            }
            const resp = await this.matchService.create(
                newMatch,
                teamIds,
                tournamentId,
                courtId
            );
            return { resp, status: 201 };
        } catch (e) {
            console.error(e);
            return {
                resp: { error: 'Error creating new Match' },
                status: 500,
            };
        }
    }
}

export default new MatchController();
