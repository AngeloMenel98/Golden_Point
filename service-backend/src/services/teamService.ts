import { TeamRepository, UserRepository } from '../repository';
import { Team } from '../entity';
import { UserService, TournamentService } from './index';
import { UserRole } from '../entity/User';
import { ServiceCodeError } from '../errors/errorsClass';

export class TeamService {
    private userService: UserService;
    private tournService: TournamentService;

    constructor() {
        this.userService = new UserService();
        this.tournService = new TournamentService();
    }

    async create(
        newTeam: Team,
        usersId: string[],
        adminUserId: string,
        tournamentId: string
    ) {
        const adminUser = await this.userService.findById(adminUserId);
        await this.tournService.findById(tournamentId);

        const usersWithData = await Promise.all(
            usersId.map((userId) =>
                this.userService.findByIdWithPersonalData(userId)
            )
        );

        if (adminUser.role == UserRole.ADMIN) {
            let teamName = '';
            const lastNames = usersWithData.map(
                (user) => user.perData.lastName
            );
            teamName = lastNames.join('-');

            return await TeamRepository.save({
                ...newTeam,
                teamName: teamName,
                users: usersWithData.map((user) => user.user),
            });
        }
    }

    async getTeamWithUsers(teamId: string) {
        const team = await TeamRepository.findOneBy({ id: teamId });

        if (!team) {
            throw new ServiceCodeError('Team ID does not exist', 'TeamS-1');
        }

        const userByTeam = await UserRepository.getUsersByTeamId(teamId);

        return { team, users: userByTeam };
    }

    async findById(teamId: string) {
        const existingTeam = await TeamRepository.findOneBy({
            id: teamId,
        });

        if (!existingTeam) {
            throw new ServiceCodeError('Team ID does not exist', 'TeamS-1');
        }

        return existingTeam;
    }
}
