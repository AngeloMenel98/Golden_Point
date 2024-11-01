import { CategoryService, ClubService, MatchService, TourService } from ".";
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
import { ClubData, CourtData, TeamData, TourData } from "../utils/interfaces";
import {
  shuffleArray,
  sortTeamsPerCategoryByPoints,
} from "../utils/functionHelpers";
import { Stats } from "fs";
import { Status } from "../entity/Tournament";

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
    if (newTournament.master <= 0) {
      throw new ServiceCodeError(codeErrors.TOURN_1);
    }

    if (categoryData.length == 0) {
      throw new ServiceCodeError(codeErrors.TOURN_2);
    }

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

      while (
        cl.avFrom.getTime() + time.HOUR_HALF <
        cl.avTo.getTime() - time.DAY
      ) {
        const newHour = new Date(cl.avFrom.getTime() + time.HOUR_HALF);
        cl.avFrom = newHour;
        cl.allHours.push(newHour);
      }

      cl.avFrom = new Date(firstTime.getTime() + time.DAY);
      cl.allHours.push(cl.avFrom);

      while (cl.avFrom.getTime() + time.HOUR_HALF < cl.avTo.getTime()) {
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
    const sortedTeams = sortTeamsPerCategoryByPoints(teamData);

    const courtData = this.assignHourToCourts(clubData);

    const groupDTOs: GroupDTO[] = [];

    for (const category in sortedTeams) {
      const teams = sortedTeams[category];
      const numTeams = teams.length;

      if (numTeams < 3 || numTeams % 3 !== 0) {
        throw new ServiceCodeError(codeErrors.TOURN_3);
      }

      const numGroups = numTeams / 3;
      for (let i = 0; i < numGroups; i++) {
        const team1 = teams[i * 3];
        const team2 = teams[i * 3 + 1];
        const team3 = teams[i * 3 + 2];

        const courtIndex = i % courtData.length;

        const hoursForGroup = courtData[courtIndex].allHours.slice(0, 3);

        courtData[courtIndex].allHours =
          courtData[courtIndex].allHours.slice(3);

        const groupDTO = new GroupDTO(
          [team1.teamId, team2.teamId, team3.teamId],
          [courtData[courtIndex].courtId],
          hoursForGroup,
          20,
          50,
          "Grupo " + (i + 1)
        );
        groupDTOs.push(groupDTO);
      }
    }
    const groupMatches = await this.createGroupsMatches(groupDTOs, tournament);

    return { groupMatches, clubInfo: clubData };
  }

  async getWinningTeams(tournamentId: string, groupStage: string[]) {
    const tt = await TournamentRepository.getWinningTeams(
      tournamentId,
      groupStage
    );

    return tt;
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

  async createGroupsMatches(groupDTOs: GroupDTO[], tournament: Tournament) {
    const matches: Match[] = [];
    for (const grDTO of groupDTOs) {
      const teams = grDTO.teamsId;
      const courtIds = grDTO.courtsId;
      const matchDates = grDTO.matchDates;

      if (matchDates.length < 3) {
        throw new ServiceCodeError(codeErrors.GEN_2("Match Date"));
      }

      if (courtIds.length === 0) {
        throw new ServiceCodeError(codeErrors.GEN_2("Courts IDs"));
      }

      for (const courtId of courtIds) {
        let matchIndex = 0;
        for (let j = 0; j < teams.length; j++) {
          for (let k = j + 1; k < teams.length; k++) {
            // Crear un partido entre los equipos j y k
            const match = new Match();
            match.amountTourPoints = grDTO.tourPoints;
            match.amountTourCoins = grDTO.tourCoins;
            match.matchDate = matchDates[matchIndex].toISOString();

            const m = await this.matchService.create(
              match,
              [teams[j], teams[k]],
              tournament,
              courtId,
              grDTO.groupName
            );
            matches.push(m);
            matchIndex++;
          }
        }
      }
    }
    await TournamentRepository.updateStatus(tournament.id, Status.IN_PROGRESS);
    return matches;
  }

  async createNextMatches(teams: any[], tournament: Tournament) {
    const matches: Match[] = [];

    const teamsByGroup = teams.reduce((acc, team) => {
      if (!acc[team.groupStageId]) {
        acc[team.groupStageId] = [];
      }
      acc[team.groupStageId].push(team);
      return acc;
    }, {});

    for (const group in teamsByGroup) {
      teamsByGroup[group].sort((a, b) => {
        // Ordenar por matchesWon, y en caso de empate por gamesDiff
        if (b.matchesWon === a.matchesWon) {
          return b.gamesDiff - a.gamesDiff;
        }
        return b.matchesWon - a.matchesWon;
      });
    }

    const matchups = [];
    const groups = Object.keys(teamsByGroup); // Get the group names dynamically

    for (let i = 0; i < groups.length; i += 2) {
      if (teamsByGroup[groups[i]] && teamsByGroup[groups[i + 1]]) {
        matchups.push([
          teamsByGroup[groups[i]][0], // First place from the first group
          teamsByGroup[groups[i + 1]][1], // Second place from the second group
        ]);
        matchups.push([
          teamsByGroup[groups[i + 1]][0], // First place from the second group
          teamsByGroup[groups[i]][1], // Second place from the first group
        ]);
      }
    }

    //FIXME: Get matchDate and courtId correction
    for (const [team1, team2] of matchups) {
      const match = new Match();
      match.amountTourCoins = 70;
      match.amountTourPoints = 75;
      match.matchDate = "2024-09-02 9:00";

      const m = await this.matchService.create(
        match,
        [team1.teamId, team2.teamId],
        tournament,
        "4c517cbb-9c05-48bf-837b-b6bae86edd9a",
        "Cuartos de Final"
      );
      matches.push(m);
    }

    return matches;
  }

  async getAll(tourId: string) {
    const tournaments: TourData[] = await TournamentRepository.getAll(tourId);

    if (tournaments.length == 0) {
      throw new ServiceCodeError(codeErrors.GEN_2("Torneo"));
    }

    return tournaments;
  }

  async getCategoriesByTournId(tournId: string) {
    const categories = await TournamentRepository.getCategoryByTournId(tournId);
    if (categories.length == 0) {
      throw new ServiceCodeError(codeErrors.GEN_2("Categorias"));
    }
    return categories;
  }

  async getMyTournaments(userId: string) {
    const tournaments = await TournamentRepository.getMyTournaments(userId);
    if (tournaments.length == 0) {
      throw new ServiceCodeError(codeErrors.GEN_2("Torneos Propio"));
    }
    return tournaments;
  }
}
