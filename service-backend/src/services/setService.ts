import { SetRepository } from '../repository';
import { Set } from '../entity';
import { MatchService } from './matchService';

export class SetService {
    private matchService: MatchService;

    constructor() {
        this.matchService = new MatchService();
    }
    async create(newSet: Set, matchId: string): Promise<Set> {
        try {
            const match = await this.matchService.findById(matchId);
            const sets = await SetRepository.getSetsByMatchId(matchId);

            if (match && sets.length < 3) {
                newSet.match = match;
                return SetRepository.save(newSet);
            }

            throw new Error('Match already has 3 sets');
        } catch (err) {
            console.error('Error creating Set', err);
        }
    }
}
