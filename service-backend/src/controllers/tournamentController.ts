import { validationResult } from "express-validator";
import { Tournament } from "../entity";
import { TournamentService } from "../services";
import { Request, Response } from "express";
import { isServiceCodeError, isUserServiceError } from "../errors/errors";
import { Manager } from "../helpers/manager";
import { TourData } from "../utils/interfaces";
import { Status } from "../entity/Tournament";

export class TournamentController {
  private tournService: TournamentService;
  private manager: Manager;

  constructor() {
    this.tournService = new TournamentService();
    this.manager = Manager.getInstance();
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

      const { tourId, userId, title, master, categories } = req.body;

      const existingUser = await this.manager.checkUserExists(userId);
      await this.manager.checkIfADMIN(existingUser);

      const newTourn = new Tournament();
      newTourn.title = title;
      newTourn.master = master;
      newTourn.isDeleted = false;
      newTourn.status = Status.PENDING;

      const tournament = await this.tournService.create(
        newTourn,
        tourId,
        categories
      );

      const response = {
        id: tournament.id,
        title: tournament.title,
        master: tournament.master,
        status: tournament.status,
        categories: tournament.categories.map((c) => c.id),
      };
      res.status(201).json(response);
    } catch (e) {
      console.error("Error creating Tournament:", e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      if (isUserServiceError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
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
            msg: error.msg,
          })),
        });
      }

      const { tournamentId, userId } = req.body;
      const existingTourn = await this.tournService.findById(tournamentId);
      const existingUser = await this.manager.checkUserExists(userId);
      await this.manager.checkIfADMIN(existingUser);

      const tournament = await this.tournService.delete(existingTourn);

      const response = {
        id: tournament.id,
        title: tournament.title,
        master: tournament.master,
        isDeleted: tournament.isDeleted,
      };

      res.status(201).json(response);
    } catch (e) {
      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      if (isUserServiceError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }

  async start(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            msg: error.msg,
          })),
        });
      }

      const { tournamentId, userId } = req.body;

      const tourn = await this.tournService.findById(tournamentId);
      const existingUser = await this.manager.checkUserExists(userId);
      await this.manager.checkIfADMIN(existingUser);

      const { clubData, teamData } =
        await this.tournService.getDataForStartingTournament(tourn);

      await this.tournService.getHoursOfMatches(clubData);

      const { groupMatches, clubInfo } =
        await this.tournService.createGroupsDTOPerCat(
          clubData,
          teamData,
          tourn
        );
      console.log(clubInfo);

      const response = groupMatches.map((match) => ({
        id: match.id,
        amountTourPoints: match.amountTourPoints,
        amountTourCoins: match.amountTourCoins,
        matchDate: match.matchDate,
        court: match.court.courtNumber,
        groupName: match.groupStage.groupStage,
      }));

      res.status(200).json(response);
    } catch (e) {
      console.error(e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      if (isUserServiceError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            msg: error.msg,
          })),
        });
      }

      const tourId = req.params.tourId;

      const tours: TourData[] = await this.tournService.getAll(tourId);

      const response = {};

      tours.forEach((tour) => {
        const tournamentId = tour.tournamentid;
        const tournamentName = tour.tournamentname;
        const genderCategory = tour.gender_category.split("-");
        const gender = genderCategory[0];
        const category = genderCategory[1];

        if (!response.hasOwnProperty(tournamentId)) {
          response[tournamentId] = {
            tournamentName: tournamentName,
            teamsCount: tour.teamscount,
            master: tour.master,
            categories: [],
            status: tour.status,
          };
        }

        response[tournamentId].categories.push({
          gender: gender,
          category: category,
        });
      });

      res.status(201).json(response);
    } catch (e) {
      console.error(e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }

  async getCatByTournId(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            msg: error.msg,
          })),
        });
      }

      const tournId = req.params.tournId;

      const cats = await this.tournService.getCategoriesByTournId(tournId);

      const response = cats.map((cat) => cat.categories);

      res.status(200).json(response);
    } catch (e) {
      console.error(e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }

  async getMyTournaments(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            msg: error.msg,
          })),
        });
      }

      const userId = req.params.userId;

      const tournaments = await this.tournService.getMyTournaments(userId);

      res.status(200).json(tournaments);
    } catch (e) {
      console.error(e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }
}

export default new TournamentController();
