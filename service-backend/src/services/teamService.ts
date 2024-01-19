import { TeamRepository } from '../repository';
import { Team, User } from '../entity';
import { UserService } from './userService';
import { UserRole } from '../entity/User';

export class TeamService {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async create(newTeam: Team, userId: string): Promise<Team | undefined> {
        try {
            const user = await this.userService.findById(userId);
            if (
                user &&
                (user.role == UserRole.SUPERADMIN ||
                    user.role == UserRole.ADMIN)
            ) {
                return await TeamRepository.save(newTeam);
            }
            console.log("Team couldn't be created");
        } catch (err) {
            console.error('Error al crear Team', err);
        }
    }

    async addUsers(teamId: string, usersId: string[]): Promise<Team> {
        try {
            const existingTeam = await TeamRepository.findOneBy({
                id: teamId,
            });

            const userPromises = usersId.map((userId) =>
                this.userService.findById(userId)
            );

            const users = await Promise.all(userPromises);

            if (existingTeam && users.length > 0) {
                existingTeam.users = users;
                return TeamRepository.save(existingTeam);
            }
        } catch (e) {
            console.error('Error adding users to Tour in Service', e);
        }
    }

    async getTeamWithUsers(
        teamId: string
    ): Promise<{ team: Team; users: User[] }> {
        try {
            const userByTeam = await TeamRepository.getUsersByTeamId(teamId);
            const team = await TeamRepository.findOneBy({ id: teamId });

            return { team, users: userByTeam };
        } catch (e) {
            console.error('Team ID is incorrect.', e);
        }
    }

    async findById(teamId: string): Promise<Team> {
        try {
            const existingTeam = await TeamRepository.findOneBy({
                id: teamId,
            });

            if (existingTeam) {
                return existingTeam;
            }
            console.error('Error finding user by ID', teamId);
            return undefined;
        } catch (err) {
            console.error('Error finding user by ID', teamId);
        }
    }
}
