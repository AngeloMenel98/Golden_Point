import { validationResult } from "express-validator";
import { Tournament } from "../entity";
import { TournamentService, ServiceRegistry } from "../services";
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
import { TourData } from "../utils/interfaces";
import { Status } from "../entity/Tournament";

export class TournamentController {
  private _tournService?: TournamentService;
  private manager: Manager;

  constructor(tournService?: TournamentService) {
    this._tournService = tournService;
    this.manager = Manager.getInstance();
  }

  private get tournService(): TournamentService {
    return this._tournService ?? ServiceRegistry.tournamentService;
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

      const { tourId, userId, title, master, categories } = req.body;

      const existingUser = await this.manager.checkUserExists(userId);
      await this.manager.checkIfADMIN(existingUser);

      const newTourn = new Tournament();
      newTourn.title = title;
      newTourn.master = master;
      newTourn.isDeleted = false;
      newTourn.status = Status.PENDING;

      const tournament = await this.tournService.create(
        newTourn,
        tourId,
        categories,
      );

      const response: ApiResponse<{
        id: string;
        title: string;
        master: string;
        status: Status;
        categories: string[];
      }> = success({
        id: tournament.id,
        title: tournament.title,
        master: tournament.master,
        status: tournament.status,
        categories: tournament.categories.map((c) => c.id),
      });

      res.status(201).json(response);
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

      const { tournamentId, userId } = req.body;
      const existingTourn = await this.tournService.findById(tournamentId);
      const existingUser = await this.manager.checkUserExists(userId);
      await this.manager.checkIfADMIN(existingUser);

      const tournament = await this.tournService.delete(existingTourn);

      const response: ApiResponse<{
        id: string;
        title: string;
        master: number;
        isDeleted: boolean;
      }> = success({
        id: tournament.id,
        title: tournament.title,
        master: tournament.master,
        isDeleted: tournament.isDeleted,
      });

      res.status(200).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async start(req: Request, res: Response): Promise<void> {
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

      const { tournamentId, userId } = req.body;

      const tourn = await this.tournService.findById(tournamentId);
      const existingUser = await this.manager.checkUserExists(userId);
      await this.manager.checkIfADMIN(existingUser);

      const { clubData, teamData } =
        await this.tournService.getDataForStartingTournament(tourn);

      await this.tournService.getHoursOfMatches(clubData);

      const { groupMatches, clubInfo } =
        await this.tournService.createGroupsDTOPerCat(
          clubData,
          teamData,
          tourn,
        );

      const response: ApiResponse<
        {
          id: string;
          amountTourPoints: number;
          amountTourCoins: number;
          matchDate: string;
          court: number;
          groupName: string;
        }[]
      > = success(
        groupMatches.map((match) => ({
          id: match.id,
          amountTourPoints: match.amountTourPoints,
          amountTourCoins: match.amountTourCoins,
          matchDate: match.matchDate,
          court: match.court.courtNumber,
          groupName: match.groupStage.groupStage,
        })),
      );

      res.status(200).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
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

      const tourId = req.params.tourId;

      const tours: TourData[] = await this.tournService.getAll(tourId);

      const response: Record<string, unknown> = {};

      tours.forEach((tour) => {
        const tournamentId = tour.tournamentid;
        const tournamentName = tour.tournamentname;
        const genderCategory = tour.gender_category.split("-");
        const gender = genderCategory[0];
        const category = genderCategory[1];

        if (!response.hasOwnProperty(tournamentId)) {
          response[tournamentId] = {
            tournamentName: tournamentName,
            teamsCount: tour.teamscount,
            master: tour.master,
            categories: [],
            status: tour.status,
          };
        }

        (response[tournamentId] as { categories: unknown[] }).categories.push({
          gender: gender,
          category: category,
        });
      });

      const apiResponse: ApiResponse<typeof response> = success(response);
      res.status(200).json(apiResponse);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async getCatByTournId(req: Request, res: Response): Promise<void> {
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

      const tournId = req.params.tournId;

      const cats = await this.tournService.getCategoriesByTournId(tournId);

      const response: ApiResponse<string[][]> = success(
        cats.map((cat) => cat.categories),
      );

      res.status(200).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async getMyTournaments(req: Request, res: Response): Promise<void> {
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

      const userId = req.params.userId;

      const tournaments = await this.tournService.getMyTournaments(userId);

      const response: ApiResponse<typeof tournaments> = success(tournaments);
      res.status(200).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  /**
   * Manual trigger endpoint for knockout progression
   * POST /tournaments/:id/categories/:categoryId/trigger-knockout
   */
  async triggerKnockout(req: Request, res: Response): Promise<void> {
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

      const tournamentId = req.params.id;
      const categoryId = req.params.categoryId;
      const { userId } = req.body;

      // Verify admin access
      const existingUser = await this.manager.checkUserExists(userId);
      await this.manager.checkIfADMIN(existingUser);

      // Verify tournament exists
      await this.tournService.findById(tournamentId);

      // Process knockout progression
      const result = await this.tournService.processKnockoutProgression(
        tournamentId,
        categoryId,
      );

      const response: ApiResponse<{
        triggered: boolean;
        stage?: string;
        matchesCreated?: number;
        message: string;
      }> = success({
        triggered: result !== null,
        stage: result?.stage,
        matchesCreated: result?.matchesCreated,
        message: result
          ? `Created ${result.matchesCreated} matches for ${result.stage}`
          : "No knockout progression needed",
      });

      res.status(200).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
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

      const { id } = req.params;
      const tournament = await this.tournService.findById(id);

      if (!tournament) {
        const errorResponse: ApiResponse<never> = failure({
          type: "NOT_FOUND",
          entity: "Torneo",
          id: id,
        });
        res.status(404).json(errorResponse);
        return;
      }

      const response: ApiResponse<Tournament> = success(tournament);
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

export default new TournamentController();
