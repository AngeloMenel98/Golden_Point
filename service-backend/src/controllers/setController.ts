import { Request, Response } from "express";
import { Set } from "../entity";
import {
  SetService,
  TeamMatchService,
  TeamService,
  TournamentService,
} from "../services";
import { validationResult } from "express-validator";
import { ApiResponse, success, failure } from "../types/response/api-response";
import {
  isNotFoundError,
  isValidationError,
  isConflictError,
  isInternalError,
  isUnauthorizedError,
} from "../types/error/error-guards";
import { ErrorType } from "../types/error/error-type";
import { Manager } from "../helpers/manager";

export class SetController {
  private setService: SetService;
  private teamMatchService: TeamMatchService;
  private tournamentService: TournamentService;
  private manager: Manager;

  constructor() {
    this.setService = new SetService();
    this.teamMatchService = new TeamMatchService();
    this.tournamentService = new TournamentService();
    this.manager = Manager.getInstance();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorResponse: ApiResponse<never> = failure({
          type: "VALIDATION",
          message: "Validation failed",
        });
        res.status(400).json(errorResponse);
        return;
      }

      const { userId, setsTeam1, setsTeam2, matchId, teamsId, tournamentId } =
        req.body;

      const user = await this.manager.checkUserExists(userId);
      await this.manager.checkIfADMIN(user);
      const tournament = await this.tournamentService.findById(tournamentId);

      const setsArray: Set[] = setsTeam1.map((setTeam1: number, index: number) => {
        const set = new Set();
        set.gamesTeam1 = setTeam1;
        set.gamesTeam2 = setsTeam2[index];
        return set;
      });
      const { winner, setsSaved } = await this.setService.create(
        setsArray,
        matchId
      );

      const teamId = winner === "Team 1" ? teamsId[0] : teamsId[1];

      await this.teamMatchService.addWinner(teamId, matchId);

      const response: ApiResponse<{
        winner: string;
        sets: {
          id: string;
          gTeams1: number;
          gTeams2: number;
          matchId: string;
        }[];
      }> = success({
        winner,
        sets: setsSaved.map((s) => ({
          id: s.id,
          gTeams1: s.gamesTeam1,
          gTeams2: s.gamesTeam2,
          matchId: s.match.id,
        })),
      });

      res.status(201).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  private handleError(e: unknown): ErrorType {
    if (isNotFoundError(e)) return e;
    if (isValidationError(e)) return e;
    if (isConflictError(e)) return e;
    if (isUnauthorizedError(e)) return e;
    if (isInternalError(e)) return e;
    return { type: "INTERNAL", message: "Internal server error" };
  }

  private getErrorStatus(e: unknown): number {
    if (isNotFoundError(e)) return 404;
    if (isValidationError(e)) return 400;
    if (isConflictError(e)) return 409;
    if (isUnauthorizedError(e)) return 401;
    return 500;
  }
}

export default new SetController();
