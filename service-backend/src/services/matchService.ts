import { MatchRepository } from '../repository';
import { Match, Team } from '../entity';
import { TeamService, TournamentService, CourtService } from '.';
import { validate } from 'class-validator';
import {
    ServiceCodeError,
    ServiceValidationError,
} from '../errors/errorsClass';

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
        const matchErrors = await validate(newMatch);

        if (matchErrors.length > 0) {
            throw new ServiceValidationError(
                'Validation error',
                matchErrors.concat(matchErrors)
            );
        }

        const teams: Team[] = await Promise.all(
            teamIds.map((teamId) => this.teamService.findById(teamId))
        );
        const tournament = await this.tournamentService.findById(tournamentId);
        const court = await this.courtService.findById(courtId);

        if (teams.length != 2) {
            throw new ServiceCodeError('Amount of teams incorrect', 'MatchS-3');
        }

        return MatchRepository.save({ ...newMatch, teams, tournament, court });
    }
    async findById(matchId: string) {
        const existingMatch = await MatchRepository.findOneBy({
            id: matchId,
        });

        if (!existingMatch) {
            throw new ServiceCodeError('Match ID does not exist', 'MatchS-1');
        }

        return existingMatch;
    }
}
