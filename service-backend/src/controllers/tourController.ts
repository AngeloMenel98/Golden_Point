import { Club, Tour } from "../entity";
import {
  ClubService,
  TourService,
  UserService,
  ServiceRegistry,
} from "../services";
import { generateTourCode } from "../helpers/generateTourCode.helper";
import { Request, Response } from "express";
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

export class TourController {
  private _tourService?: TourService;
  private _clubService?: ClubService;
  private manager: Manager;

  constructor(tourService?: TourService, clubService?: ClubService) {
    this._tourService = tourService;
    this._clubService = clubService;
    this.manager = Manager.getInstance();
  }

  private get tourService(): TourService {
    return this._tourService ?? ServiceRegistry.tourService;
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

      const { title, userId, clubsId } = req.body;

      const newTour = new Tour();
      newTour.title = title;
      newTour.tourCode = await generateTourCode();

      const user = await this.manager.checkUserExists(userId);
      await this.manager.checkIfADMIN(user);

      const clubs = await this.clubService.findByIds(clubsId);

      const tour = await this.tourService.create(newTour, user, clubs);

      const response: ApiResponse<{
        id: string;
        title: string;
        tourCode: string;
        isDeleted: boolean;
        usersId: string[];
        clubsId: string[];
      }> = success({
        id: tour.id,
        title: tour.title,
        tourCode: tour.tourCode,
        isDeleted: tour.isDeleted,
        usersId: tour.users.map((u) => u.id),
        clubsId: tour.clubs.map((c) => c.id),
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

      const { tourId, userId } = req.body;

      const existingTour = await this.tourService.findById(tourId);
      const existingUser = await this.manager.checkUserExists(userId);
      await this.manager.checkIfADMIN(existingUser);

      const tour = await this.tourService.delete(existingTour);

      const response: ApiResponse<{
        id: string;
        title: string;
        tourCode: string;
        isDeleted: boolean;
      }> = success({
        id: tour.id,
        title: tour.title,
        tourCode: tour.tourCode,
        isDeleted: tour.isDeleted,
      });

      res.status(200).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async joinUser(req: Request, res: Response): Promise<void> {
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

      const { userId, tourCode } = req.body;

      const user = await this.manager.checkUserExists(userId);

      const tour = await this.tourService.joinUserToTour(user, tourCode);

      const response: ApiResponse<{
        id: string;
        title: string;
        tourCode: string;
        usersId: string[];
      }> = success({
        id: tour.id,
        title: tour.title,
        tourCode: tour.tourCode,
        usersId: tour.users.map((u) => u.id),
      });

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

      const userId = req.params.userId;

      const tours = await this.tourService.getAll(userId);

      const response: ApiResponse<typeof tours> = success(tours);
      res.status(200).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async getTourById(req: Request, res: Response): Promise<void> {
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
      const existingTour = await this.tourService.findById(tourId);

      const response: ApiResponse<typeof existingTour> = success(existingTour);
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

export default new TourController();
