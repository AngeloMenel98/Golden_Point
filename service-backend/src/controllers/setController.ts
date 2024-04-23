import { Request, Response } from "express";
import { Set } from "../entity";
import { SetService, UserService } from "../services";
import { validationResult } from "express-validator";
import { isServiceCodeError } from "../errors/errors";
import { isNotUserAdmin } from "../helpers/adminValidation";

export class MatchController {
  private setService: SetService;
  private userService: UserService;

  constructor() {
    this.setService = new SetService();
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

      const { userId, gamesTeam1, gamesTeam2, matchId } = req.body;

      const user = await this.userService.findById(userId);
      isNotUserAdmin(user);

      const newSet = new Set();
      newSet.gamesTeam1 = gamesTeam1;
      newSet.gamesTeam2 = gamesTeam2;

      const set = await this.setService.create(newSet, matchId);

      const response = {
        id: set.id,
        gTeams1: set.gamesTeam1,
        gTeams2: set.gamesTeam2,
        matchId: set.match.id,
      };

      res.status(201).json(response);
    } catch (e) {
      console.error("Error creating set:", e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }
}

export default new MatchController();
