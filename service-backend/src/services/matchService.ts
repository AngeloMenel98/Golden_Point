import { MatchRepository } from "../repository";
import { Match, Team } from "../entity";
import { TeamService, TournamentService, CourtService } from ".";
import { validate } from "class-validator";
import { ServiceCodeError } from "../errors/errorsClass";
import codeErrors from "../constants/codeErrors";

export class MatchService {
  private teamService: TeamService;
  private tournamentService: TournamentService;
  private courtService: CourtService;

  constructor() {
    this.teamService = new TeamService();
    this.tournamentService = new TournamentService();
    this.courtService = new CourtService();
  }

  async create(
    newMatch: Match,
    teamIds: string[],
    tournamentId: string,
    courtId: string
  ) {
    const teams: Team[] = await Promise.all(
      teamIds.map((teamId) => this.teamService.findById(teamId))
    );
    const tournament = await this.tournamentService.findById(tournamentId);
    const court = await this.courtService.findById(courtId);

    if (teams.length != 2) {
      throw new ServiceCodeError(codeErrors.MATCH_1);
    }

    return MatchRepository.save({ ...newMatch, teams, tournament, court });
  }

  async findById(matchId: string) {
    const existingMatch = await MatchRepository.findOneBy({
      id: matchId,
    });

    if (!existingMatch) {
      throw new ServiceCodeError(codeErrors.GEN_1("Match"));
    }

    return existingMatch;
  }
}
