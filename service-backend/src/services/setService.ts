import { SetRepository } from "../repository";
import { Set } from "../entity";
import { MatchService } from ".";
import { validationError } from "../types/error/app-error";

export class SetService {
  private _matchService?: MatchService;

  constructor(matchService?: MatchService) {
    this._matchService = matchService;
  }

  private get matchService(): MatchService {
    if (!this._matchService) {
      this._matchService = new MatchService();
    }
    return this._matchService;
  }

  async create(newSets: Set[], matchId: string) {
    const match = await this.matchService.findById(matchId);
    const sets = await SetRepository.getSetsByMatchId(matchId);
    let winner: string = "";

    if (sets.length + newSets.length > 3) {
      throw validationError("El partido ya tiene 3 sets");
    }

    if (newSets.length <= 1) {
      throw validationError("Cantidad de Sets insuficientes");
    }

    if (newSets.length == 2) {
      const team1Wins = newSets.every((set) => set.gamesTeam1 > set.gamesTeam2);
      const team2Wins = newSets.every((set) => set.gamesTeam2 > set.gamesTeam1);

      if (!team1Wins && !team2Wins) {
        throw validationError("Uno de los equipos debe ganar ambos sets");
      }

      winner = team1Wins ? "Team 1" : "Team 2";
    }

    if (newSets.length === 3) {
      const team1Wins =
        newSets.filter((set) => set.gamesTeam1 > set.gamesTeam2).length >= 2;
      const team2Wins =
        newSets.filter((set) => set.gamesTeam2 > set.gamesTeam1).length >= 2;

      if (!team1Wins && !team2Wins) {
        throw validationError("Uno de los equipos debe ganar al menos 2 de los 3 sets");
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
