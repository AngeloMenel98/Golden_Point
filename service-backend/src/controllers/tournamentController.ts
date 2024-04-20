import { validationResult } from "express-validator";
import { Tournament } from "../entity";
import { TournamentService, UserService } from "../services";
import { Request, Response } from "express";
import { isServiceCodeError, isUserServiceError } from "../errors/errors";

export class TournamentController {
  private tournService: TournamentService;
  private userService: UserService;

  constructor() {
    this.tournService = new TournamentService();
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

      const { tourId, userId, title, master, categoryData } = req.body;

      const newTourn = new Tournament();
      newTourn.title = title;
      newTourn.master = master;
      newTourn.isDeleted = false;

      const tournament = await this.tournService.create(
        newTourn,
        tourId,
        userId,
        categoryData
      );

      const response = {
        id: tournament.id,
        title: tournament.title,
        master: tournament.master,
        categories: tournament.categories.map((c) => c.id),
      };
      res.status(201).json(response);
    } catch (e) {
      console.error("Error creating Tournament:", e);

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
        return res.status(400).json({ errors: errors.array() });
      }

      const { tournamentId, userId } = req.body;
      const existingTourn = await this.tournService.findById(tournamentId);
      const existingUser = await this.userService.findById(userId);

      const tournament = await this.tournService.delete(
        existingTourn,
        existingUser
      );

      const response = {
        id: tournament.id,
        title: tournament.title,
        master: tournament.master,
        isDeleted: tournament.isDeleted,
      };

      res.status(201).json(response);
    } catch (e) {
      if (isServiceCodeError(e)) {
        return res.status(400).json({ errors: [{ msg: e.message }] });
      }

      if (isUserServiceError(e)) {
        return res.status(400).json({ errors: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }
}

export default new TournamentController();
