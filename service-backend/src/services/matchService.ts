import { MatchRepository } from '../repository';
import { Match, Team } from '../entity';
import { TeamService } from './teamService';
import { TournamentService } from './tournamentService';

export class MatchService {
    private teamService: TeamService;
    private tournamentService: TournamentService;

    constructor() {
        this.teamService = new TeamService();
        this.tournamentService = new TournamentService();
    }

    async create(
        newMatch: Match,
        teamIds: string[],
        tournamentId: string
    ): Promise<Match> {
        try {
            const teams: Team[] = await Promise.all(
                teamIds.map((teamId) => this.teamService.findById(teamId))
            );
            const tournament = await this.tournamentService.findById(
                tournamentId
            );

            if (teams.length == 2 && tournament) {
                newMatch.teams = teams;
                newMatch.tournament = tournament;
                return MatchRepository.save(newMatch);
            }
            throw new Error('Invalid number of teams for a match');
        } catch (e) {
            console.error(e);
            throw new Error('Error creating Match with Teams');
        }
    }
}
