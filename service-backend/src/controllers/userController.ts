import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import { PersonalData, TourCoin, User } from "../entity";
import { UserRepository } from "../repository";
import { UserService, ServiceRegistry } from "../services";
import { UserRole } from "../entity/User";
import { ApiResponse, success, failure } from "../types/response/api-response";
import {
  isNotFoundError,
  isValidationError,
  isConflictError,
  isInternalError,
  isUnauthorizedError,
} from "../types/error/error-guards";
import { ErrorType } from "../types/error/error-type";
import {
  UserResponse,
  UserLoginResponse,
  UserListResult,
  UserRankingResult,
  UserStatsResponse,
  UserRankingResponse,
} from "../types/dto/user.dto";

export class UserController {
  private _userService?: UserService;

  constructor(userService?: UserService) {
    this._userService = userService;
  }

  private get userService(): UserService {
    return this._userService ?? ServiceRegistry.userService;
  }

  async logIn(req: Request, res: Response): Promise<void> {
    try {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        const errorResponse: ApiResponse<never> = failure({
          type: "VALIDATION",
          message: "Validation failed",
          field: "login",
        });
        res.status(401).json(errorResponse);
        return;
      }

      const { username, password } = req.body;

      const user = await this.userService.logIn(username, password);

      const userResponse: UserResponse = {
        id: user.user.id,
        username: user.user.username,
        email: user.user.email,
        isSingle: user.user.isSingle,
        role: user.user.role,
        firstName: user.personalData?.firstName,
        lastName: user.personalData?.lastName,
        tourCoins: user.tourCoins,
      };

      const secretKey = process.env.JWT_SECRET_KEY;
      if (!secretKey) {
        throw new Error("JWT_SECRET_KEY environment variable is required");
      }
      const token = jwt.sign(userResponse, secretKey);

      const loginResponse: UserLoginResponse = { token, user: userResponse };
      const response: ApiResponse<UserLoginResponse> = success(loginResponse);

      res.status(201).json(response);
    } catch (e) {
      console.error("Login error:", e);
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        const errorResponse: ApiResponse<never> = failure({
          type: "VALIDATION",
          message: "Validation failed",
        });
        res.status(400).json(errorResponse);
        return;
      }

      const {
        username,
        email,
        password,
        firstName,
        lastName,
        location,
        phoneNumber,
      } = req.body;

      const newUser = new User();
      newUser.username = username;
      newUser.email = email;
      newUser.hashPassword(password);
      newUser.isSingle = true;
      newUser.role = UserRole.USER;

      const newPerData = new PersonalData();
      newPerData.firstName = firstName;
      newPerData.lastName = lastName;
      newPerData.location = location;
      newPerData.phoneNumber = phoneNumber;

      const newTourCoin = new TourCoin();
      newTourCoin.coins = 0;

      const user = await this.userService.create(
        newUser,
        newPerData,
        newTourCoin,
      );

      const response: ApiResponse<UserResponse> = success({
        id: user.id,
        username: user.username,
        email: user.email,
        isSingle: user.isSingle,
        role: user.role,
      });

      res.status(201).json(response);
    } catch (e: unknown) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        const errorResponse: ApiResponse<never> = failure({
          type: "VALIDATION",
          message: "Validation failed",
        });
        res.status(400).json(errorResponse);
        return;
      }

      const {
        userId,
        password,
        isSingle,
        firstName,
        lastName,
        phoneNumber,
        location,
      } = req.body;

      const user = await this.userService.findById(userId);

      const updatedUser = new User();
      updatedUser.username = user.username;
      updatedUser.email = user.email;
      updatedUser.hashPassword(password);
      updatedUser.isSingle = isSingle;
      updatedUser.role = UserRole.USER;

      const updatedPerData = new PersonalData();
      updatedPerData.firstName = firstName;
      updatedPerData.lastName = lastName;
      updatedPerData.phoneNumber = phoneNumber;
      updatedPerData.location = location;

      const resUser = await this.userService.update(
        updatedUser,
        user,
        updatedPerData,
      );

      const response: ApiResponse<UserResponse> = success({
        id: resUser.id,
        username: resUser.username,
        email: resUser.email,
        isSingle: resUser.isSingle,
        role: resUser.role,
      });

      res.status(200).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        const errorResponse: ApiResponse<never> = failure({
          type: "VALIDATION",
          message: "Validation failed",
        });
        res.status(400).json(errorResponse);
        return;
      }

      const { userId } = req.body;
      const user = await this.userService.findById(userId);

      const resp = await this.userService.delete(user);

      const response: ApiResponse<UserResponse> = success({
        id: resp.id,
        username: resp.username,
        email: resp.email,
        isSingle: resp.isSingle,
        role: resp.role,
      });

      res.status(200).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async findByUsername(req: Request, res: Response): Promise<void> {
    try {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        const errorResponse: ApiResponse<never> = failure({
          type: "VALIDATION",
          message: "Validation failed",
        });
        res.status(400).json(errorResponse);
        return;
      }

      const { username } = req.params;
      const resp = await this.userService.findByUsername(username);

      const response: ApiResponse<UserResponse> = success({
        id: resp.id,
        username: resp.username,
        email: resp.email,
        isSingle: resp.isSingle,
        role: resp.role,
      });

      res.status(200).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
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

      const users = await this.userService.getAll(tourId);

      const response: ApiResponse<UserListResult[]> = success(users);
      res.status(200).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async getRanking(req: Request, res: Response): Promise<void> {
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
      const category = req.params.category;

      const users = await this.userService.getRanking(tourId, category);

      const response: ApiResponse<UserRankingResult[]> = success(users);
      res.status(200).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async getUserStats(req: Request, res: Response): Promise<void> {
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

      const { userId } = req.params;
      const stats = await this.userService.getUserStats(userId);

      const response: ApiResponse<UserStatsResponse> = success(stats);
      res.status(200).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async getTournamentUserStats(req: Request, res: Response): Promise<void> {
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

      const { tourId, userId } = req.params;
      const stats = await this.userService.getTournamentUserStats(
        tourId,
        userId,
      );

      const response: ApiResponse<UserStatsResponse> = success(stats);
      res.status(200).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async getGlobalRankings(req: Request, res: Response): Promise<void> {
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

      const rankings = await this.userService.getGlobalRankings();

      const response: ApiResponse<UserRankingResponse[]> = success(rankings);
      res.status(200).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async getTournamentRankings(req: Request, res: Response): Promise<void> {
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

      const { tourId } = req.params;
      const rankings = await this.userService.getTournamentRankings(tourId);

      const response: ApiResponse<UserRankingResponse[]> = success(rankings);
      res.status(200).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure(this.handleError(e));
      res.status(this.getErrorStatus(e)).json(errorResponse);
    }
  }

  async me(req: Request, res: Response): Promise<void> {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        const errorResponse: ApiResponse<never> = failure({
          type: "UNAUTHORIZED",
          message: "Unauthorized",
        });
        res.status(401).json(errorResponse);
        return;
      }

      const token = authHeader.split(" ")[1];
      const secretKey = process.env.JWT_SECRET_KEY;
      if (!secretKey) {
        throw new Error("JWT_SECRET_KEY environment variable is required");
      }

      const decoded = jwt.verify(token, secretKey) as {
        id: string;
        username: string;
        email: string;
        isSingle: boolean;
        role: string;
        firstName?: string;
        lastName?: string;
      };

      // Fetch fresh user data including tourCoins from database
      const userWithTourCoin = await UserRepository.findUserWithPerData(
        decoded.id,
      );

      const userResponse: UserResponse = {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
        isSingle: decoded.isSingle,
        role: decoded.role as UserRole,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        tourCoins: userWithTourCoin?.tourCoin?.coins ?? 0,
      };

      const response: ApiResponse<UserResponse> = success(userResponse);
      res.status(200).json(response);
    } catch (e) {
      const errorResponse: ApiResponse<never> = failure({
        type: "UNAUTHORIZED",
        message: "Unauthorized",
      });
      res.status(401).json(errorResponse);
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

export default new UserController();
