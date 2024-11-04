import { CourtRepository, MatchRepository } from "../repository";
import { Court, Match, Team, Tournament } from "../entity";
import { TeamService, CourtService } from ".";
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
    courtId: string,
    groupStage: string
  ) {
    const teams: Team[] = await Promise.all(
      teamIds.map((teamId) => this.teamService.findById(teamId))
    );

    const court = await this.courtService.findById(courtId);

    if (teams.length != 2) {
      throw new ServiceCodeError(codeErrors.MATCH_1);
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
      throw new ServiceCodeError(codeErrors.GEN_1("Match"));
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
      throw new ServiceCodeError(codeErrors.GEN_2("Partido"));
    }
    if (!matches) {
      throw new ServiceCodeError(codeErrors.GEN_1("Torneo"));
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
      throw new ServiceCodeError(codeErrors.COURT_1);
    }

    const match = await MatchRepository.updateMatch(matchId, matchDate, court);

    if (!match) {
      throw new ServiceCodeError(codeErrors.MATCH_2);
    }

    return match;
  }
}
