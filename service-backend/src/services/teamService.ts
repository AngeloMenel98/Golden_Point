import { TeamRepository } from '../repository';
import { Team, User } from '../entity';
import { UserService } from './userService';
import { UserRole } from '../entity/User';

export class TeamService {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async create(newTeam: Team, usersId: string[], adminUserId: string) {
        try {
            const adminUser = await this.userService.findById(adminUserId);

            //FIXME: Find a way to get users info to link newTeam.users
            const userProm = usersId.map((userId) =>
                this.userService.findByIdWithPersonalData(userId)
            );
            const usersWithData = await Promise.all(userProm);

            if (usersWithData.length > 0 && adminUser.role == UserRole.ADMIN) {
                const userPromises = usersId.map((userId) =>
                    this.userService.findById(userId)
                );

                const users = await Promise.all(userPromises);

                let teamName = '';
                const lastNames = usersWithData.map(
                    (user) => user.personalData.lastName
                );
                teamName = lastNames.join('-');

                newTeam.teamName = teamName;
                newTeam.users = users;

                return await TeamRepository.save(newTeam);
            }
            console.log("Team couldn't be created");
        } catch (err) {
            console.error('Error al crear Team', err);
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
