import { CourtRepository, MatchRepository } from "../repository";
import { Court, Match, Team, Tournament } from "../entity";
import { TeamService, CourtService } from ".";
import { notFound, conflict, validationError } from "../types/error/app-error";

export class MatchService {
  private teamService: TeamService;
  private courtService: CourtService;

  constructor() {
    this.teamService = new TeamService();
    this.courtService = new CourtService();
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
}
