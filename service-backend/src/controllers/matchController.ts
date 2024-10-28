import { validationResult } from "express-validator";
import { Match } from "../entity";
import { MatchService } from "../services";
import { Request, Response } from "express";
import { isServiceCodeError } from "../errors/errors";

export class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  async getMatches(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            msg: error.msg,
          })),
        });
      }

      const { tournamentId, category, groupStage } = req.params;

      const response = await this.matchService.getMatches(
        tournamentId,
        category,
        groupStage
      );

      res.status(201).json(response);
    } catch (e) {
      console.error("Error getting matches:", e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }

  async updateMatch(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            msg: error.msg,
          })),
        });
      }

      const { matchId, matchDate, courtNumber, clubId } = req.body;

      const response = await this.matchService.updateMatch(
        matchId,
        matchDate,
        courtNumber,
        clubId
      );

      res.status(201).json(response);
    } catch (e) {
      console.error("Error updating match:", e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }
}

export default new MatchController();
