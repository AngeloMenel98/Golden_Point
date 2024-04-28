import { Request, Response } from "express";
import { Set } from "../entity";
import { SetService } from "../services";
import { validationResult } from "express-validator";
import { isServiceCodeError, isUserServiceError } from "../errors/errors";
import { Manager } from "../helpers/manager";

export class SetController {
  private setService: SetService;
  private manager: Manager;

  constructor() {
    this.setService = new SetService();
    this.manager = Manager.getInstance();
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

      const user = await this.manager.checkUserExists(userId);
      await this.manager.checkIfADMIN(user);

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

      if (isUserServiceError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }
}

export default new SetController();
