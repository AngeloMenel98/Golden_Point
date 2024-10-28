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

  async create(newSets: Set[], matchId: string) {
    const match = await this.matchService.findById(matchId);
    const sets = await SetRepository.getSetsByMatchId(matchId);
    let winner: string = "";

    if (sets.length + newSets.length > 3) {
      throw new ServiceCodeError(codeErrors.SET_1(3));
    }

    if (newSets.length <= 1) {
      throw new ServiceCodeError(codeErrors.SET_0);
    }

    if (newSets.length == 2) {
      const team1Wins = newSets.every((set) => set.gamesTeam1 > set.gamesTeam2);
      const team2Wins = newSets.every((set) => set.gamesTeam2 > set.gamesTeam1);

      if (!team1Wins && !team2Wins) {
        throw new ServiceCodeError(codeErrors.SET_2);
      }

      winner = team1Wins ? "Team 1" : "Team 2";
    }

    if (newSets.length === 3) {
      const team1Wins =
        newSets.filter((set) => set.gamesTeam1 > set.gamesTeam2).length >= 2;
      const team2Wins =
        newSets.filter((set) => set.gamesTeam2 > set.gamesTeam1).length >= 2;

      if (!team1Wins && !team2Wins) {
        throw new ServiceCodeError(codeErrors.SET_3);
      }
      winner = team1Wins ? "Team 1" : "Team 2";
    }

    const setsToSave = newSets.map((set) => ({
      gamesTeam1: set.gamesTeam1,
      gamesTeam2: set.gamesTeam2,
      match: match,
    }));

    const setsSaved = await SetRepository.save(setsToSave);
    return { winner, setsSaved };
  }
}
