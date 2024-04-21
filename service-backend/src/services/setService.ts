import { SetRepository } from "../repository";
import { Set } from "../entity";
import { MatchService, UserService } from ".";
import { ServiceCodeError } from "../errors/errorsClass";
import codeErrors from "../constants/codeErrors";
import { isNotUserAdmin } from "../helpers/adminValidation";

export class SetService {
  private matchService: MatchService;
  private userService: UserService;

  constructor() {
    this.matchService = new MatchService();
    this.userService = new UserService();
  }
  async create(userId: string, newSet: Set, matchId: string) {
    const user = await this.userService.findById(userId);

    isNotUserAdmin(user);

    const match = await this.matchService.findById(matchId);
    const sets = await SetRepository.getSetsByMatchId(matchId);

    if (sets.length >= 3) {
      throw new ServiceCodeError(codeErrors.SET_1(3));
    }

    return SetRepository.save({ ...newSet, match });
  }
}
