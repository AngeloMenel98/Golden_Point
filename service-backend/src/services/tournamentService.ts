import { CategoryService, MatchService, TourService } from ".";
import codeErrors from "../constants/codeErrors";
import time from "../constants/time";
import { Category, Tournament } from "../entity";
import { ServiceCodeError } from "../errors/errorsClass";
import {
  ClubRepository,
  TeamRepository,
  TournamentRepository,
} from "../repository";

export interface ClubData {
  clubName: string;
  master: number;
  avFrom: Date;
  avTo: Date;
  allHours?: Date[];
  ctNumbers: string[];
  categories: string[];
}

export interface TeamData {
  teamName: string;
  category: string;
  totalPoints: number;
}

export class TournamentService {
  private tourService: TourService;
  private categoryService: CategoryService;
  private matchService: MatchService;

  constructor() {
    this.tourService = new TourService();
    this.categoryService = new CategoryService();
    this.matchService = new MatchService();
  }

  async create(
    newTournament: Tournament,
    tourId: string,
    categoryData: Category[]
  ) {
    const existingTour = await this.tourService.findById(tourId);

    const existingCats = await this.categoryService.findCategories(
      categoryData
    );

    const newCategories = await this.categoryService.create(categoryData);
    const combinedCategories = [...existingCats, ...newCategories];

    return TournamentRepository.create(
      newTournament,
      existingTour,
      combinedCategories
    );
  }

  async delete(tournament: Tournament) {
    tournament.isDeleted = true;
    return TournamentRepository.save(tournament);
  }

  async startData(tournament: Tournament) {
    const clubsWithCat = await ClubRepository.getClubs(tournament.id);
    const teamsWithCat = await TeamRepository.getTeams(tournament.id);

    if (!clubsWithCat || clubsWithCat.length == 0) {
      throw new ServiceCodeError(codeErrors.GEN_2("Club con el Tournament ID"));
    }

    if (!teamsWithCat || teamsWithCat.length == 0) {
      throw new ServiceCodeError(
        codeErrors.GEN_2("Equipo con el Tournament ID")
      );
    }

    const clubData: ClubData[] = [];
    const teamData: TeamData[] = [];

    for (const cwc of clubsWithCat) {
      clubData.push({
        clubName: cwc.clubName,
        master: cwc.master,
        avFrom: new Date(cwc.availableFrom),
        avTo: new Date(cwc.availableTo),
        ctNumbers: cwc.courtNumbers.split(", "),
        categories: cwc.categories.split(", "),
      });
    }

    for (const twc of teamsWithCat) {
      const usersWithPoints = await TeamRepository.getAmountPointPerUser(
        twc.tourId,
        twc.category,
        twc.usersId.split(", ")
      );

      teamData.push({
        teamName: twc.teamName,
        category: twc.category,
        totalPoints: usersWithPoints.reduce((acc, user) => acc + user.sum, 0),
      });
    }

    return { clubData, teamData };
  }

  async startHoursOfMatches(clubData: ClubData[]) {
    for (let cl of clubData) {
      cl.allHours = [];
      const firstTime = cl.avFrom;
      cl.allHours.push(firstTime);

      while (cl.avFrom.getTime() < cl.avTo.getTime() - time.DAY) {
        const newHour = new Date(cl.avFrom.getTime() + time.HOUR_HALF);
        cl.avFrom = newHour;
        cl.allHours.push(newHour);
      }

      cl.avFrom = new Date(firstTime.getTime() + time.DAY);
      cl.allHours.push(cl.avFrom);

      while (cl.avFrom.getTime() < cl.avTo.getTime()) {
        const newHour = new Date(cl.avFrom.getTime() + time.HOUR_HALF);
        cl.avFrom = newHour;
        cl.allHours.push(newHour);
      }
    }
  }

  async sortTeams(clubData: ClubData[], teamData: TeamData[]) {
    throw new Error("Method not implented");
  }

  async findById(tournamentId: string) {
    const existingTourn = await TournamentRepository.findOneBy({
      id: tournamentId,
    });

    if (!existingTourn) {
      throw new ServiceCodeError(codeErrors.GEN_1("Tournament"));
    }

    return existingTourn;
  }
}
