import { MatchRepository } from '../repository';
import { Match, Team } from '../entity';
import { TeamService, TournamentService, CourtService } from '.';

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
    ): Promise<Match> {
        try {
            const teams: Team[] = await Promise.all(
                teamIds.map((teamId) => this.teamService.findById(teamId))
            );
            const tournament = await this.tournamentService.findById(
                tournamentId
            );
            const court = await this.courtService.findById(courtId);

            if (teams.length == 2 && tournament && court) {
                newMatch.teams = teams;
                newMatch.tournament = tournament;
                newMatch.court = court;

                return MatchRepository.save(newMatch);
            }
            throw new Error('Invalid number of teams for a match');
        } catch (e) {
            console.error(e);
            throw new Error('Error creating Match with Teams');
        }
    }
    async findById(matchId: string): Promise<Match> {
        try {
            const existingMatch = await MatchRepository.findOneBy({
                id: matchId,
            });

            if (existingMatch) {
                return existingMatch;
            }
            console.error('Error finding Match by ID', matchId);
        } catch (err) {
            console.error('Error finding Match by ID', matchId);
        }
    }
}
