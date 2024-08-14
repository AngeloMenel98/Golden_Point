import { Request, Response } from "express";
import { Set } from "../entity";
import { SetService, TeamMatchService, TeamService } from "../services";
import { validationResult } from "express-validator";
import { isServiceCodeError, isUserServiceError } from "../errors/errors";
import { Manager } from "../helpers/manager";

export class SetController {
  private setService: SetService;
  private teamMatchService: TeamMatchService;
  private manager: Manager;

  constructor() {
    this.setService = new SetService();
    this.teamMatchService = new TeamMatchService();
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

      const { userId, setsTeam1, setsTeam2, matchId, teamsId } = req.body;

      const user = await this.manager.checkUserExists(userId);
      await this.manager.checkIfADMIN(user);

      const setsArray: Set[] = setsTeam1.map((setTeam1, index) => {
        const set = new Set();
        set.gamesTeam1 = setTeam1;
        set.gamesTeam2 = setsTeam2[index];
        return set;
      });
      const { winner, setsSaved } = await this.setService.create(
        setsArray,
        matchId
      );

      const teamId = winner === "Team 1" ? teamsId[0] : teamsId[1];
      this.teamMatchService.addWinner(teamId, matchId);

      const response = {
        winner,
        sets: setsSaved.map((s) => ({
          id: s.id,
          gTeams1: s.gamesTeam1,
          gTeams2: s.gamesTeam2,
          matchId: s.match.id,
        })),
      };
      res.status(201).json(response);
    } catch (e) {
      console.error("Error creating sets:", e);

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
