import { Tour } from "../entity";
import { TourService, UserService } from "../services";
import { generateCode } from "../helpers/generateTourCode.helper";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { isServiceCodeError, isUserServiceError } from "../errors/errors";
import { isNotUserAdmin } from "../helpers/adminValidation";

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

      const user = await this.userService.findById(userId);
      isNotUserAdmin(user);

      const tour = await this.tourService.create(newTour, user);

      const response = {
        id: tour.id,
        title: tour.title,
        tourCode: tour.tourCode,
        isDeleted: tour.isDeleted,
        usersId: tour.users.map((u) => u.id),
      };

      res.status(201).json(response);
    } catch (e) {
      console.error(e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ errors: [{ msg: e.message }] });
      }

      if (isUserServiceError(e)) {
        return res.status(400).json({ errors: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
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
      isNotUserAdmin(existingUser);

      const tour = await this.tourService.delete(existingTour);

      const response = {
        id: tour.id,
        title: tour.title,
        tourCode: tour.tourCode,
        isDeleted: tour.isDeleted,
      };

      res.status(201).json(response);
    } catch (e) {
      console.error(e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      if (isUserServiceError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
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

      const user = await this.userService.findById(userId);

      const tour = await this.tourService.joinUserToTour(user, tourCode);

      const response = {
        id: tour.id,
        title: tour.title,
        tourCode: tour.tourCode,
        usersId: tour.users.map((u) => u.id),
      };
      res.status(201).json(response);
    } catch (e) {
      console.error(e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      if (isUserServiceError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
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
      console.error(e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }
}

export default new TourController();
