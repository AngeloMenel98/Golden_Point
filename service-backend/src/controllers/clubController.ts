import { ClubService } from "../services";
import { CalendarClub, Club } from "../entity";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { isServiceCodeError } from "../errors/errors";

export class ClubController {
  private clubService: ClubService;

  constructor() {
    this.clubService = new ClubService();
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

      const {
        clubName,
        tourId,
        address,
        userId,
        availableFrom,
        availableTo,
        courtsNumber,
      } = req.body;

      const newClub = new Club();
      newClub.clubName = clubName;
      newClub.location = address;

      const newCalClub = new CalendarClub();
      newCalClub.availableTo = availableTo;
      newCalClub.availableFrom = availableFrom;

      const club = await this.clubService.create(
        newClub,
        newCalClub,
        userId,
        tourId,
        courtsNumber
      );

      const response = {
        id: club.id,
        clubName: club.clubName,
        address: club.location,
        calendarClub: club.calendarClub.id,
        tour: club.tour.id,
      };

      res.status(201).json(response);
    } catch (e) {
      console.error("Error creating clubs:", e);

      if (isServiceCodeError(e)) {
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

      const response = await this.clubService.getAll();
      res.status(201).json(response);
    } catch (e) {
      console.error("Error getting clubs:", e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }
}

export default new ClubController();
