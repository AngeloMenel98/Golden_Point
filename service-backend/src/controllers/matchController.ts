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
        amountTourPoints,
        amountTourCoins,
        matchDate,
        teamIds,
        tournamentId,
        courtId,
      } = req.body;

      const newMatch = new Match();
      newMatch.amountTourCoins = amountTourCoins;
      newMatch.amountTourPoints = amountTourPoints;
      newMatch.matchDate = matchDate;

      const match = await this.matchService.create(
        newMatch,
        teamIds,
        tournamentId,
        courtId
      );

      const response = {
        id: match.id,
        aTourCoins: match.amountTourCoins,
        aTourPoints: match.amountTourPoints,
        matchDate: match.matchDate,
        tournament: match.tournament.id,
        court: match.court.id,
      };

      res.status(201).json(response);
    } catch (e) {
      console.error("Error creating match:", e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }
}

export default new MatchController();
