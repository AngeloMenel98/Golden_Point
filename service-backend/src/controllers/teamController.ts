import { Team } from '../entity';
import { TeamService } from '../services';

export class TeamController {
    private teamService: TeamService;

    constructor() {
        this.teamService = new TeamService();
    }

    async create(adminUserId: string, usersId: string[]) {
        try {
            const newTeam = new Team();

            const resp = await this.teamService.create(
                newTeam,
                usersId,
                adminUserId
            );

            const response = {
                teamId: resp.id,
                teamName: resp.teamName,
                users: resp.users.map((u) => u.id),
            };

            return { response, status: 201 };
        } catch (e) {
            console.error(e);
            return {
                resp: { error: 'Error creating new Team' },
                status: 500,
            };
        }
    }

    async getTeam(teamId: string) {
        try {
            const resp = await this.teamService.getTeamWithUsers(teamId);

            const response = {
                teamId: resp.team.id,
                teamName: resp.team.teamName,
                users: resp.users.map((u) => u.id),
            };
            return { response, status: 201 };
        } catch (e) {
            console.error(e);
            return {
                response: { error: 'Error finding a Team' },
                status: 500,
            };
        }
    }
}
export default new TeamController();
