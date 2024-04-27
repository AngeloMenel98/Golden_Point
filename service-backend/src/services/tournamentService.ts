import { CategoryService, MatchService, TourService } from ".";
import codeErrors from "../constants/codeErrors";
import time from "../constants/time";
import { Category, Match, Tournament } from "../entity";
import { GroupDTO } from "../entity/dtos/GroupsDTO";
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
  teamId: string;
  teamName: string;
  category: string;
  totalPoints: number;
  usersId: string[];
}

export interface CourtData {
  courtId: string;
  allHours: Date[];
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

  async getDataForStartingTournament(tournament: Tournament) {
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
        tournament.id,
        twc.category,
        twc.usersId.split(", ")
      );

      teamData.push({
        teamId: twc.teamId,
        teamName: twc.teamName,
        category: twc.category,
        totalPoints: usersWithPoints.reduce(
          (acc, user) => acc + user.points,
          0
        ),
        usersId: twc.usersId.split(", "),
      });
    }

    return { clubData, teamData };
  }

  async getHoursOfMatches(clubData: ClubData[]) {
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

  async createGroupsDTOPerCat(
    clubData: ClubData[],
    teamData: TeamData[],
    tournament: Tournament
  ) {
    const sortedTeams = this.sortTeamsPerCategoryByPoints(teamData);

    const courtData = this.assignHourToCourts(clubData);

    const groupDTOs: GroupDTO[] = [];

    for (const category in sortedTeams) {
      const teams = sortedTeams[category];
      const numTeams = teams.length;

      if (numTeams < 3) continue;

      const numGroups = numTeams / 3;
      for (let i = 0; i < numGroups; i++) {
        const team1 = teams[i * 3];
        const team2 = teams[i * 3 + 1];
        const team3 = teams[i * 3 + 2];

        const courtIndex = i % courtData.length;
        const court = courtData[courtIndex];

        const groupDTO = new GroupDTO(
          [team1.teamId, team2.teamId, team3.teamId],
          [court.courtId],
          [court.allHours[0], court.allHours[1], court.allHours[2]],
          20,
          50
        );
        groupDTOs.push(groupDTO);

        court.allHours.splice(0, 3);
        console.log(courtData[0]);
      }
    }

    return groupDTOs;
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

  public assignHourToCourts(clubData: ClubData[]) {
    const courtData: CourtData[] = [];

    clubData.forEach((cl) => {
      const hours = [...cl.allHours];
      cl.ctNumbers.forEach((courtId) => {
        const court: CourtData = {
          courtId: courtId,
          allHours: hours,
        };

        courtData.push(court);
      });
    });

    return courtData;
  }

  async getTeamsIds(sortedTeams: any) {
    const teamsId = [];
  }

  private sortTeamsPerCategoryByPoints(teamData: TeamData[]) {
    if (teamData.length === 0) {
      throw new ServiceCodeError(
        codeErrors.GEN_2("Equipo para ordenar por puntos")
      );
    }

    const teamsByCategory = {};

    teamData.forEach((team) => {
      const { category } = team;

      // Si la categoría no está en el objeto, agrégala y crea un array para almacenar los equipos
      if (!teamsByCategory[category]) {
        teamsByCategory[category] = [];
      }
      teamsByCategory[category].push(team);
    });

    // Ordena los equipos dentro de cada categoría por totalPoints de mayor a menor
    for (const category in teamsByCategory) {
      teamsByCategory[category].sort((a, b) => b.totalPoints - a.totalPoints);
    }

    return teamsByCategory;
  }
}
