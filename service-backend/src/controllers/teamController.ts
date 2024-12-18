import { validationResult } from "express-validator";
import { Team } from "../entity";
import { TeamService, TournamentService, UserService } from "../services";
import { Request, Response } from "express";
import { isServiceCodeError, isUserServiceError } from "../errors/errors";
import { Manager } from "../helpers/manager";

export class TeamController {
  private teamService: TeamService;
  private manager: Manager;
  private tournService: TournamentService;

  constructor() {
    this.teamService = new TeamService();
    this.manager = Manager.getInstance();
    this.tournService = new TournamentService();
  }

  async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            msg: error.msg,
          })),
        });
      }

      const { adminUserId, usersId, category, tournamentId } = req.body;

      const adminUser = await this.manager.checkUserExists(adminUserId);
      await this.manager.checkIfADMIN(adminUser);

      const tournament = await this.tournService.findById(tournamentId);

      const newTeam = new Team();
      newTeam.category = category;

      const teams = await this.teamService.create(
        newTeam,
        usersId,
        this.manager,
        tournament
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
            msg: error.msg,
          })),
        });
      }

      const teamId = req.params.id;
      const team = await this.teamService.getTeamWithUsers(teamId);

      const response = {
        teamId: team.team.id,
        teamName: team.team.teamName,
        category: team.team.category,
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

  async getTeams(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            msg: error.msg,
          })),
        });
      }

      const tournamentId = req.params.tournamentId;
      const teams = await this.teamService.getTeams(tournamentId);

      res.status(201).json(teams);
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

  async delete(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            msg: error.msg,
          })),
        });
      }

      const { userId, teamsId } = req.body;

      const adminUser = await this.manager.checkUserExists(userId);
      await this.manager.checkIfADMIN(adminUser);

      const teams = await this.teamService.delete(teamsId);

      res.status(201).json(teams.affected);
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
}
export default new TeamController();
