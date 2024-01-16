import { TeamRepository } from '../repository/team.repository';
import { Team } from '../entity';
import { UserService } from './userService';
import { UserRole } from '../entity/User';

export class TeamService {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async create(newTeam: Team, userId: number): Promise<Team | undefined> {
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

    async addUsers(
        teamId: number,
        usersId: number[]
    ): Promise<Team | undefined> {
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
            console.error('Error al agregar usuario al Tour', e);
        }
    }

    async getTeam(teamId: number): Promise<Team | undefined> {
        try {
            const existingTeam = await TeamRepository.findOneBy({ id: teamId });
            if (existingTeam) {
                return existingTeam;
            }
            console.log("Team doesn't exist");
        } catch (e) {
            console.error('Error al agregar usuario al Tour', e);
        }
    }
}
