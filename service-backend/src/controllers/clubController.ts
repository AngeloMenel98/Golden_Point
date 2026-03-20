import { ClubService, ServiceRegistry } from "../services";
import { CalendarClub, Club } from "../entity";
import { validationResult } from "express-validator";
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

export class ClubController {
  private _clubService?: ClubService;
  private manager: Manager;

  constructor(clubService?: ClubService) {
    this._clubService = clubService;
    this.manager = Manager.getInstance();
  }

  private get clubService(): ClubService {
    return this._clubService ?? ServiceRegistry.clubService;
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

      const {
        clubName,
        address,
        userId,
        availableFrom,
        availableTo,
        courtsNumber,
      } = req.body;

      const existingUser = await this.manager.checkUserExists(userId);
      await this.manager.checkIfADMIN(existingUser);

      const newClub = new Club();
      newClub.clubName = clubName;
      newClub.location = address;

      const newCalClub = new CalendarClub();
      newCalClub.availableTo = availableTo;
      newCalClub.availableFrom = availableFrom;

      const club = await this.clubService.create(
        newClub,
        newCalClub,
        courtsNumber
      );

      const response: ApiResponse<{
        id: string;
        clubName: string;
        address: string;
        calendarClub: string;
      }> = success({
        id: club.id,
        clubName: club.clubName,
        address: club.location,
        calendarClub: club.calendarClub.id,
      });

      res.status(201).json(response);
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

      const userId = req.params.userId;

      const response = await this.clubService.getAll(userId);
      const apiResponse: ApiResponse<typeof response> = success(response);
      res.status(200).json(apiResponse);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async getClubsPerTour(req: Request, res: Response): Promise<void> {
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

      const { userId, tourId } = req.params;

      const response = await this.clubService.getClubsPerTour(userId, tourId);
      const apiResponse: ApiResponse<typeof response> = success(response);
      res.status(200).json(apiResponse);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async updateClub(req: Request, res: Response): Promise<void> {
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

      const { clubId, clubName, location, avFrom, avTo, userId } = req.body;
      const existingUser = await this.manager.checkUserExists(userId);
      await this.manager.checkIfADMIN(existingUser);

      const response = await this.clubService.updateClub(
        clubId,
        clubName,
        location,
        avFrom,
        avTo
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

export default new ClubController();
