import { SetRepository } from '../repository';
import { Set } from '../entity';
import { MatchService, UserService } from '.';
import { UserRole } from '../entity/User';
import { ServiceCodeError } from '../errors/errorsClass';

export class SetService {
    private matchService: MatchService;
    private userService: UserService;

    constructor() {
        this.matchService = new MatchService();
        this.userService = new UserService();
    }
    async create(userId: string, newSet: Set, matchId: string): Promise<Set> {
        const user = await this.userService.findById(userId);

        if (user.role != UserRole.ADMIN) {
            throw new ServiceCodeError('User is not ADMIN', 'SetS-3');
        }

        const match = await this.matchService.findById(matchId);
        const sets = await SetRepository.getSetsByMatchId(matchId);

        if (sets.length >= 3) {
            throw new ServiceCodeError('Match already has 3 sets', 'SetS-4');
        }

        return SetRepository.save({ ...newSet, match });
    }
}
