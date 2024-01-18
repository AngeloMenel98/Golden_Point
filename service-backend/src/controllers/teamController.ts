import { Team } from '../entity';
import { TeamService } from '../services';

export class TeamController {
    private teamService: TeamService;

    constructor() {
        this.teamService = new TeamService();
    }

    async create(teamName: string, userId: string) {
        try {
            const newTeam = new Team();
            newTeam.teamName = teamName;

            const resp = await this.teamService.create(newTeam, userId);

            return { resp, status: 201 };
        } catch (e) {
            console.error(e);
            return {
                resp: { error: 'Error creating new Team' },
                status: 500,
            };
        }
    }

    async addUsers(teamId: string, usersId: string[]) {
        try {
            const resp = await this.teamService.addUsers(teamId, usersId);

            const response = {
                id: resp.id,
                teamName: resp.teamName,
                usersId: resp.users.map((u) => u.id),
            };

            return { response, status: 201 };
        } catch (e) {
            console.error(e);
            return {
                response: { error: 'Error adding Users' },
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
