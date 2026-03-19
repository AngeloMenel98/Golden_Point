import { validationResult } from "express-validator";
import { Match } from "../entity";
import { MatchService } from "../services";
import { Request, Response } from "express";
import { ApiResponse, success, failure } from "../types/response/api-response";
import {
  isNotFoundError,
  isValidationError,
  isConflictError,
  isInternalError,
} from "../types/error/error-guards";
import { ErrorType } from "../types/error/error-type";

export class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  async getMatches(req: Request, res: Response): Promise<void> {
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

      const { tournamentId, category, groupStage } = req.params;

      const response = await this.matchService.getMatches(
        tournamentId,
        category,
        groupStage
      );

      const apiResponse: ApiResponse<typeof response> = success(response);
      res.status(200).json(apiResponse);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async updateMatch(req: Request, res: Response): Promise<void> {
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

      const { matchId, matchDate, courtNumber, clubId } = req.body;

      const response = await this.matchService.updateMatch(
        matchId,
        matchDate,
        courtNumber,
        clubId
      );

      const apiResponse: ApiResponse<typeof response> = success(response);
      res.status(200).json(apiResponse);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  private handleError(e: unknown): ErrorType {
    if (isNotFoundError(e)) return e;
    if (isValidationError(e)) return e;
    if (isConflictError(e)) return e;
    if (isInternalError(e)) return e;
    return { type: "INTERNAL", message: "Internal server error" };
  }

  private getErrorStatus(e: unknown): number {
    if (isNotFoundError(e)) return 404;
    if (isValidationError(e)) return 400;
    if (isConflictError(e)) return 409;
    return 500;
  }
}

export default new MatchController();
