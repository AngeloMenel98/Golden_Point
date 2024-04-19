import { Tour } from "../entity";
import { TourService, UserService } from "../services";
import { generateCode } from "../helpers/generateTourCode.helper";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { isServiceCodeError, isUserServiceError } from "../errors/errors";
import { UserRole } from "../entity/User";
import { ServiceCodeError } from "../errors/errorsClass";

export class TourController {
  private tourService: TourService;
  private userService: UserService;

  constructor() {
    this.tourService = new TourService();
    this.userService = new UserService();
  }
  async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            message: error.msg,
          })),
        });
      }

      const { title, userId } = req.body;

      const newTour = new Tour();
      newTour.title = title;
      newTour.tourCode = generateCode(6);

      const tour = await this.tourService.create(newTour, userId);

      const response = {
        id: tour.id,
        title: tour.title,
        tourCode: tour.tourCode,
        isDeleted: tour.isDeleted,
        usersId: tour.users.map((u) => u.id),
      };

      res.status(201).json(response);
    } catch (e) {
      console.error("Error creating tour:", e);

      if (isServiceCodeError(e)) {
        res.status(400).json({ error: e.code });
        return;
      }

      if (isUserServiceError(e)) {
        res.status(400).json({ error: e.message });
        return;
      }

      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            message: error.msg,
          })),
        });
      }

      const { tourId, userId } = req.body;
      const existingTour = await this.tourService.findById(tourId);
      const existingUser = await this.userService.findById(userId);

      if (existingUser.role != UserRole.ADMIN) {
        throw new ServiceCodeError("User is not ADMIN", "TourS-3");
      }

      const tour = await this.tourService.delete(existingTour);

      const response = {
        id: tour.id,
        title: tour.title,
        tourCode: tour.tourCode,
        isDeleted: tour.isDeleted,
      };

      res.status(201).json(response);
    } catch (e) {
      console.error("Error creating tour:", e);

      if (isServiceCodeError(e)) {
        res.status(400).json({ error: e.code });
        return;
      }

      if (isUserServiceError(e)) {
        res.status(400).json({ error: e.message });
      }

      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async joinUser(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            message: error.msg,
          })),
        });
      }

      const { userId, tourCode } = req.body;

      const tour = await this.tourService.joinUserToTour(userId, tourCode);

      const response = {
        id: tour.id,
        title: tour.title,
        tourCode: tour.tourCode,
        usersId: tour.users.map((u) => u.id),
      };
      res.status(201).json(response);
    } catch (e) {
      console.error("Error creating tour:", e);

      if (isServiceCodeError(e)) {
        res.status(400).json({ error: e.code });
        return;
      }

      if (isUserServiceError(e)) {
        res.status(400).json({ error: e.message });
        return;
      }

      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            message: error.msg,
          })),
        });
      }

      const tours = await this.tourService.getAll();

      res.status(201).json(tours);
    } catch (e) {
      console.error("Error creating tour:", e);

      if (isServiceCodeError(e)) {
        res.status(400).json({ error: e.code });
        return;
      }

      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new TourController();
