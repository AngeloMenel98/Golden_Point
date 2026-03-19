import { validationResult } from "express-validator";
import { Team } from "../entity";
import { TeamService, TournamentService, UserService } from "../services";
import { Request, Response } from "express";
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

export class TeamController {
  private teamService: TeamService;
  private manager: Manager;
  private tournService: TournamentService;

  constructor() {
    this.teamService = new TeamService();
    this.manager = Manager.getInstance();
    this.tournService = new TournamentService();
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

      const { adminUserId, usersId, category, tournamentId } = req.body;

      const adminUser = await this.manager.checkUserExists(adminUserId);
      await this.manager.checkIfADMIN(adminUser);

      const tournament = await this.tournService.findById(tournamentId);

      const newTeam = new Team();
      newTeam.category = category;

      const teams = await this.teamService.create(
        newTeam,
        usersId,
        this.manager,
        tournament
      );

      const response: ApiResponse<{
        teamId: string;
        teamName: string;
        users: string[];
      }> = success({
        teamId: teams.id,
        teamName: teams.teamName,
        users: teams.users.map((u) => u.id),
      });

      res.status(201).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async getTeam(req: Request, res: Response): Promise<void> {
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

      const teamId = req.params.id;
      const team = await this.teamService.getTeamWithUsers(teamId);

      const response: ApiResponse<{
        teamId: string;
        teamName: string;
        category: string;
        users: string[];
      }> = success({
        teamId: team.team.id,
        teamName: team.team.teamName,
        category: team.team.category,
        users: team.users.map((u) => u.id),
      });

      res.status(200).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async getTeams(req: Request, res: Response): Promise<void> {
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

      const tournamentId = req.params.tournamentId;
      const teams = await this.teamService.getTeams(tournamentId);

      const response: ApiResponse<typeof teams> = success(teams);
      res.status(200).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
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

      const { userId, teamsId } = req.body;

      const adminUser = await this.manager.checkUserExists(userId);
      await this.manager.checkIfADMIN(adminUser);

      const teams = await this.teamService.delete(teamsId);

      const response: ApiResponse<number> = success(teams.affected);
      res.status(200).json(response);
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
export default new TeamController();
