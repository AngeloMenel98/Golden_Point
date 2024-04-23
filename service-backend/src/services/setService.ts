import { SetRepository } from "../repository";
import { Set } from "../entity";
import { MatchService } from ".";
import { ServiceCodeError } from "../errors/errorsClass";
import codeErrors from "../constants/codeErrors";

export class SetService {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  async create(newSet: Set, matchId: string) {
    const match = await this.matchService.findById(matchId);
    const sets = await SetRepository.getSetsByMatchId(matchId);

    if (sets.length >= 3) {
      throw new ServiceCodeError(codeErrors.SET_1(3));
    }

    return SetRepository.save({ ...newSet, match });
  }
}
