import { MatchRepository } from "../repository";
import { Match, Team, Tournament } from "../entity";
import { TeamService, TournamentService, CourtService } from ".";
import { ServiceCodeError } from "../errors/errorsClass";
import codeErrors from "../constants/codeErrors";

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
    courtId: string
  ) {
    const teams: Team[] = await Promise.all(
      teamIds.map((teamId) => this.teamService.findById(teamId))
    );
    const court = await this.courtService.findById(courtId);

    if (teams.length != 2) {
      throw new ServiceCodeError(codeErrors.MATCH_1);
    }

    const t = await MatchRepository.create(newMatch, teams, tournament, court);
    console.log(t);
    return t;
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
