import { validationResult } from "express-validator";
import { Team } from "../entity";
import { TeamService } from "../services";
import { Request, Response } from "express";
import { isServiceCodeError, isUserServiceError } from "../errors/errors";
export class TeamController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
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

      const { adminUserId, usersId, tournamentId } = req.body;
      const newTeam = new Team();

      const teams = await this.teamService.create(
        newTeam,
        usersId,
        adminUserId,
        tournamentId
      );

      const response = {
        teamId: teams.id,
        teamName: teams.teamName,
        users: teams.users.map((u) => u.id),
      };

      res.status(201).json(response);
    } catch (e) {
      console.error("Error creating teams:", e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      if (isUserServiceError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      return res
        .status(500)
        .json({ error: [{ msg: "Internal Server Error" }] });
    }
  }

  async getTeam(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            message: error.msg,
          })),
        });
      }

      const teamId = req.params.id;
      const team = await this.teamService.getTeamWithUsers(teamId);

      const response = {
        teamId: team.team.id,
        teamName: team.team.teamName,
        users: team.users.map((u) => u.id),
      };
      res.status(201).json(response);
    } catch (e) {
      console.error("Error getting team:", e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      return res
        .status(500)
        .json({ error: [{ msg: "Internal Server Error" }] });
    }
  }
}
export default new TeamController();
