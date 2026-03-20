import { CourtRepository, MatchRepository } from "../repository";
import { Court, Match, Team, Tournament } from "../entity";
import { TeamService, CourtService, TournamentService } from ".";
import { notFound, conflict, validationError } from "../types/error/app-error";

export class MatchService {
  private _teamService?: TeamService;
  private _courtService?: CourtService;
  private _tournamentService?: TournamentService;

  constructor(
    teamService?: TeamService,
    courtService?: CourtService,
    tournamentService?: TournamentService
  ) {
    this._teamService = teamService;
    this._courtService = courtService;
    this._tournamentService = tournamentService;
  }

  private get teamService(): TeamService {
    if (!this._teamService) {
      this._teamService = new TeamService();
    }
    return this._teamService;
  }

  private get courtService(): CourtService {
    if (!this._courtService) {
      this._courtService = new CourtService();
    }
    return this._courtService;
  }

  private get tournamentService(): TournamentService {
    if (!this._tournamentService) {
      this._tournamentService = new TournamentService();
    }
    return this._tournamentService;
  }

  async create(
    newMatch: Match,
    teamIds: string[],
    tournament: Tournament,
    courtId: string,
    groupStage: string
  ) {
    const teams: Team[] = await Promise.all(
      teamIds.map((teamId) => this.teamService.findById(teamId))
    );

    const court = await this.courtService.findById(courtId);

    if (teams.length != 2) {
      throw validationError("Cantidad de equipos incorrectos");
    }

    return MatchRepository.create(
      newMatch,
      teams,
      tournament,
      court,
      groupStage
    );
  }

  async findById(matchId: string) {
    const existingMatch = await MatchRepository.findOneBy({
      id: matchId,
    });

    if (!existingMatch) {
      throw notFound("Match", matchId);
    }

    return existingMatch;
  }

  async getMatches(tournamentId: string, category: string, groupStage: string) {
    const matches: unknown[] = await MatchRepository.getMatches(
      tournamentId,
      category,
      groupStage
    );

    if (matches.length == 0) {
      throw conflict("No se encontro ningún Partido", "Partido");
    }
    if (!matches) {
      throw notFound("Torneo", tournamentId);
    }

    return matches;
  }

  async updateMatch(
    matchId: string,
    matchDate: string,
    courtNumber: string,
    clubId: string
  ) {
    const court = await CourtRepository.getCourtByClubId(clubId, courtNumber);

    if (!court) {
      throw validationError("Número de cancha no existe");
    }

    const match = await MatchRepository.updateMatch(matchId, matchDate, court);

    if (!match) {
      throw validationError("El partido no se pudo actualizar");
    }

    return match;
  }

  /**
   * Check and trigger knockout progression if match completion warrants it
   * This is called after a winner is set for a match
   */
  async checkKnockoutTrigger(
    tournamentId: string,
    categoryId: string
  ): Promise<{ triggered: boolean; result?: { stage: string; matchesCreated: number } }> {
    try {
      const result = await this.tournamentService.processKnockoutProgression(
        tournamentId,
        categoryId
      );

      if (result) {
        return {
          triggered: true,
          result: {
            stage: result.stage,
            matchesCreated: result.matchesCreated,
          },
        };
      }

      return { triggered: false };
    } catch (error) {
      console.error("Error in knockout trigger:", error);
      // Don't throw - knockout progression failure shouldn't break set creation
      return { triggered: false };
    }
  }
}
