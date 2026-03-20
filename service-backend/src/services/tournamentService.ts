import { CategoryService, ClubService, MatchService, TourService } from ".";
import time from "../constants/time";
import { Category, Match, Tournament } from "../entity";
import { GroupDTO } from "../entity/dtos/GroupsDTO";
import {
  ClubRepository,
  MatchRepository,
  TeamRepository,
  TournamentRepository,
  KNOCKOUT_STAGES,
} from "../repository";
import { ClubData, CourtData, TeamData, TourData } from "../utils/interfaces";
import {
  shuffleArray,
  sortTeamsPerCategoryByPoints,
} from "../utils/functionHelpers";
import { Stats } from "fs";
import { Status } from "../entity/Tournament";
import { notFound, conflict, validationError } from "../types/error/app-error";
import { TeamRankingData } from "../types/dto/team.dto";
import {
  KnockoutResult,
  StageCompletion,
  QualifiedTeam,
} from "../types/dto/tournament.dto";

export class TournamentService {
  private _tourService?: TourService;
  private _categoryService?: CategoryService;
  private _matchService?: MatchService;

  constructor(
    tourService?: TourService,
    categoryService?: CategoryService,
    matchService?: MatchService
  ) {
    this._tourService = tourService;
    this._categoryService = categoryService;
    this._matchService = matchService;
  }

  private get tourService(): TourService {
    if (!this._tourService) {
      this._tourService = new TourService();
    }
    return this._tourService;
  }

  private get categoryService(): CategoryService {
    if (!this._categoryService) {
      this._categoryService = new CategoryService();
    }
    return this._categoryService;
  }

  private get matchService(): MatchService {
    if (!this._matchService) {
      this._matchService = new MatchService();
    }
    return this._matchService;
  }

  async create(
    newTournament: Tournament,
    tourId: string,
    categoryData: Category[]
  ) {
    if (newTournament.master <= 0) {
      throw validationError("Master obligatorio");
    }

    if (categoryData.length == 0) {
      throw validationError("Al menos se necesita una categoría");
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
      throw conflict("No se encontro ningún Club con el Tournament ID", "Club");
    }

    if (!teamsWithCat || teamsWithCat.length == 0) {
      throw conflict("No se encontro ningún Equipo con el Tournament ID", "Equipo");
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
        throw validationError("Numero de equipo no suficientes");
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
      throw notFound("Tournament", tournamentId);
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
        throw conflict("No se encontro ningún Match Date", "Match Date");
      }

      if (courtIds.length === 0) {
        throw conflict("No se encontro ningún Courts IDs", "Courts IDs");
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

  async getAll(tourId: string) {
    const tournaments: TourData[] = await TournamentRepository.getAll(tourId);

    if (tournaments.length == 0) {
      throw conflict("No se encontro ningún Torneo", "Torneo");
    }

    return tournaments;
  }

  async getCategoriesByTournId(tournId: string) {
    const categories = await TournamentRepository.getCategoryByTournId(tournId);
    if (categories.length == 0) {
      throw conflict("No se encontro ningún Categorias", "Categorias");
    }
    return categories;
  }

  async getMyTournaments(userId: string) {
    const tournaments = await TournamentRepository.getMyTournaments(userId);
    if (tournaments.length == 0) {
      throw conflict("No se encontro ningún Torneos Propio", "Torneos Propio");
    }
    return tournaments;
  }

  // ============================================
  // KNOCKOUT AUTOMATION METHODS
  // ============================================

  /**
   * Check if all group stage matches are complete for a category
   */
  async checkCategoryGroupStageComplete(
    tournamentId: string,
    categoryId: string
  ): Promise<StageCompletion> {
    // Get all group stage matches (non-knockout)
    const groupMatches = await MatchRepository.getGroupStageMatches(
      tournamentId,
      categoryId
    );

    if (groupMatches.length === 0) {
      return { complete: false };
    }

    // Check if all matches have a winner
    const allComplete = groupMatches.every((match) =>
      match.teamMatches?.some((tm) => tm.isWinner === true)
    );

    if (!allComplete) {
      return { complete: false };
    }

    // Get qualified teams (1st and 2nd place from each group)
    const qualifiedTeams = await this.getQualifiedTeams(
      tournamentId,
      categoryId
    );

    return {
      complete: true,
      teams: qualifiedTeams,
    };
  }

  /**
   * Get qualified teams based on group stage results
   * Returns teams sorted by group, with 1st and 2nd place from each group
   */
  private async getQualifiedTeams(
    tournamentId: string,
    categoryId: string
  ): Promise<QualifiedTeam[]> {
    const groupMatches = await MatchRepository.getGroupStageMatches(
      tournamentId,
      categoryId
    );

    // Group matches by their groupStageId
    const matchesByGroup = new Map<string, Match[]>();
    groupMatches.forEach((match) => {
      const groupId = match.groupStage.id;
      if (!matchesByGroup.has(groupId)) {
        matchesByGroup.set(groupId, []);
      }
      matchesByGroup.get(groupId)!.push(match);
    });

    const qualifiedTeams: QualifiedTeam[] = [];

    // For each group, determine 1st and 2nd place
    for (const [groupId, matches] of matchesByGroup) {
      // Count wins for each team in this group
      const teamWins = new Map<string, number>();
      const teamGamesDiff = new Map<string, number>();

      matches.forEach((match) => {
        const winner = match.teamMatches?.find((tm) => tm.isWinner === true);
        const loser = match.teamMatches?.find((tm) => tm.isWinner === false);

        if (winner && loser) {
          teamWins.set(
            winner.teamId,
            (teamWins.get(winner.teamId) || 0) + 1
          );
        }
      });

      // Sort teams by wins and then by games difference
      const teamsInGroup = [
        ...new Set(
          matches.flatMap((m) =>
            m.teamMatches?.map((tm) => ({ teamId: tm.teamId, team: tm.team }))
          )
        ),
      ];

      const teamData = teamsInGroup.map(({ teamId }) => {
        const teamMatch = matches
          .flatMap((m) => m.teamMatches || [])
          .find((tm) => tm.teamId === teamId);

        return {
          teamId,
          team: teamMatch?.team,
          wins: teamWins.get(teamId) || 0,
        };
      });

      // Sort by wins descending
      teamData.sort((a, b) => b.wins - a.wins);

      // Get 1st and 2nd place
      const topTwo = teamData.slice(0, 2);
      topTwo.forEach((td) => {
        qualifiedTeams.push({
          teamId: td.teamId,
          groupStageId: groupId,
          matchesWon: td.wins,
          gamesDiff: 0, // TODO: Calculate games diff properly if needed
        });
      });
    }

    return qualifiedTeams;
  }

  /**
   * Check if a knockout stage is complete
   */
  async checkKnockoutStageComplete(
    tournamentId: string,
    categoryId: string,
    stageName: string
  ): Promise<{ complete: boolean; winners?: QualifiedTeam[] }> {
    // Get all matches for this knockout stage
    const matches = await MatchRepository.getKnockoutMatches(
      tournamentId,
      categoryId,
      stageName
    );

    if (matches.length === 0) {
      return { complete: false };
    }

    // Check if all matches have a winner
    const allComplete = matches.every((match) =>
      match.teamMatches?.some((tm) => tm.isWinner === true)
    );

    if (!allComplete) {
      return { complete: false };
    }

    // Extract winners
    const winners: QualifiedTeam[] = matches
      .flatMap((match) => {
        const winnerTM = match.teamMatches?.find((tm) => tm.isWinner === true);
        if (!winnerTM) return [];
        return {
          teamId: winnerTM.teamId,
          groupStageId: match.groupStage.id,
          matchesWon: 1, // Single match in knockout
          gamesDiff: 0,
        };
      })
      .filter((w) => w !== null) as QualifiedTeam[];

    return { complete: true, winners };
  }

  /**
   * Calculate remaining hours for knockout scheduling
   * Returns hours from club availability that haven't been used by group stage matches
   */
  async getRemainingHours(
    tournamentId: string,
    categoryId: string
  ): Promise<Date[]> {
    // Get club data for the tournament
    const clubData = await this.getDataForStartingTournament(
      await this.findById(tournamentId)
    );

    // Calculate all available hours for clubs
    await this.getHoursOfMatches(clubData.clubData);

    // Get all available hours
    const allHours = new Set<string>();
    clubData.clubData.forEach((club) => {
      club.allHours?.forEach((hour) => {
        allHours.add(hour.toISOString());
      });
    });

    // Get scheduled dates for this category
    const scheduledDates = await MatchRepository.getScheduledDatesByCategory(
      tournamentId,
      categoryId
    );
    const scheduledSet = new Set(
      scheduledDates.map((d) => new Date(d).toISOString())
    );

    // Filter out scheduled hours
    const remainingHours = [...allHours]
      .filter((hour) => !scheduledSet.has(hour))
      .map((hour) => new Date(hour))
      .sort((a, b) => a.getTime() - b.getTime());

    return remainingHours;
  }

  /**
   * Main method to process knockout progression
   * Creates next knockout stage if current stage is complete
   */
  async processKnockoutProgression(
    tournamentId: string,
    categoryId: string
  ): Promise<KnockoutResult | null> {
    const tournament = await this.findById(tournamentId);

    // Step 1: Check if group stage is complete and create quarterfinals
    const groupStageStatus = await this.checkCategoryGroupStageComplete(
      tournamentId,
      categoryId
    );

    if (groupStageStatus.complete && groupStageStatus.teams) {
      const hasCuartos = await MatchRepository.hasKnockoutMatches(
        tournamentId,
        categoryId,
        KNOCKOUT_STAGES.CUARTOS
      );

      if (!hasCuartos) {
        // Validate minimum teams (8 teams = 4 quarterfinals)
        if (groupStageStatus.teams.length < 4) {
          throw validationError(
            "Invalid bracket: minimum 4 teams required for knockout"
          );
        }

        const remainingHours = await this.getRemainingHours(
          tournamentId,
          categoryId
        );

        if (remainingHours.length === 0) {
          throw validationError(
            "No remaining hours for knockout scheduling"
          );
        }

        const matches = await this.createNextMatches(
          groupStageStatus.teams,
          tournament,
          KNOCKOUT_STAGES.CUARTOS,
          categoryId,
          remainingHours
        );

        return {
          stage: KNOCKOUT_STAGES.CUARTOS,
          matchesCreated: matches.length,
          teams: groupStageStatus.teams.map((t) => t.teamId),
        };
      }
    }

    // Step 2: Check if quarterfinals are complete and create semifinals
    const cuartosStatus = await this.checkKnockoutStageComplete(
      tournamentId,
      categoryId,
      KNOCKOUT_STAGES.CUARTOS
    );

    if (cuartosStatus.complete && cuartosStatus.winners) {
      const hasSemis = await MatchRepository.hasKnockoutMatches(
        tournamentId,
        categoryId,
        KNOCKOUT_STAGES.SEMIFINAL
      );

      if (!hasSemis) {
        const remainingHours = await this.getRemainingHours(
          tournamentId,
          categoryId
        );

        if (remainingHours.length === 0) {
          throw validationError(
            "No remaining hours for knockout scheduling"
          );
        }

        const matches = await this.createNextMatches(
          cuartosStatus.winners,
          tournament,
          KNOCKOUT_STAGES.SEMIFINAL,
          categoryId,
          remainingHours
        );

        return {
          stage: KNOCKOUT_STAGES.SEMIFINAL,
          matchesCreated: matches.length,
          teams: cuartosStatus.winners.map((t) => t.teamId),
        };
      }
    }

    // Step 3: Check if semifinals are complete and create final
    const semisStatus = await this.checkKnockoutStageComplete(
      tournamentId,
      categoryId,
      KNOCKOUT_STAGES.SEMIFINAL
    );

    if (semisStatus.complete && semisStatus.winners) {
      const hasFinal = await MatchRepository.hasKnockoutMatches(
        tournamentId,
        categoryId,
        KNOCKOUT_STAGES.FINAL
      );

      if (!hasFinal) {
        const remainingHours = await this.getRemainingHours(
          tournamentId,
          categoryId
        );

        if (remainingHours.length === 0) {
          throw validationError(
            "No remaining hours for knockout scheduling"
          );
        }

        const matches = await this.createNextMatches(
          semisStatus.winners,
          tournament,
          KNOCKOUT_STAGES.FINAL,
          categoryId,
          remainingHours
        );

        return {
          stage: KNOCKOUT_STAGES.FINAL,
          matchesCreated: matches.length,
          teams: semisStatus.winners.map((t) => t.teamId),
        };
      }
    }

    return null; // No progression needed or possible
  }

  /**
   * Create knockout matches for given teams
   * Refactored from original createNextMatches with dynamic parameters
   */
  async createNextMatches(
    teams: QualifiedTeam[],
    tournament: Tournament,
    roundName: string,
    categoryId: string,
    remainingHours: Date[]
  ): Promise<Match[]> {
    const matches: Match[] = [];

    // Group teams by their original groupStageId
    const teamsByGroup = teams.reduce((acc, team) => {
      if (!acc[team.groupStageId]) {
        acc[team.groupStageId] = [];
      }
      acc[team.groupStageId].push(team);
      return acc;
    }, {} as Record<string, QualifiedTeam[]>);

    // Sort teams within each group by matchesWon (and gamesDiff as tiebreaker)
    for (const group in teamsByGroup) {
      teamsByGroup[group].sort((a, b) => {
        if (b.matchesWon === a.matchesWon) {
          return b.gamesDiff - a.gamesDiff;
        }
        return b.matchesWon - a.matchesWon;
      });
    }

    // Create matchups: 1st vs 2nd from cross groups
    const matchups: [QualifiedTeam, QualifiedTeam][] = [];
    const groups = Object.keys(teamsByGroup);

    for (let i = 0; i < groups.length; i += 2) {
      if (teamsByGroup[groups[i]] && teamsByGroup[groups[i + 1]]) {
        matchups.push([
          teamsByGroup[groups[i]][0], // 1st from group i
          teamsByGroup[groups[i + 1]][1], // 2nd from group i+1
        ]);
        matchups.push([
          teamsByGroup[groups[i + 1]][0], // 1st from group i+1
          teamsByGroup[groups[i]][1], // 2nd from group i
        ]);
      }
    }

    // Create matches using remaining hours and a court
    const clubData = await this.getDataForStartingTournament(tournament);
    await this.getHoursOfMatches(clubData.clubData);

    // Flatten all court IDs
    const allCourtIds = clubData.clubData.flatMap((club) => club.ctNumbers);

    let hourIndex = 0;
    let courtIndex = 0;

    for (const [team1, team2] of matchups) {
      if (hourIndex >= remainingHours.length) {
        break; // No more hours available
      }

      const match = new Match();
      match.amountTourCoins = 70;
      match.amountTourPoints = 75;
      match.matchDate = remainingHours[hourIndex].toISOString();

      const courtId = allCourtIds[courtIndex % allCourtIds.length];

      try {
        const m = await this.matchService.create(
          match,
          [team1.teamId, team2.teamId],
          tournament,
          courtId,
          roundName
        );
        matches.push(m);
      } catch (error) {
        console.error(
          `Error creating match for teams ${team1.teamId} vs ${team2.teamId}:`,
          error
        );
      }

      hourIndex++;
      courtIndex++;
    }

    return matches;
  }
}
