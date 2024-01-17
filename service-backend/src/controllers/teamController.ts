import { Request, Response } from 'express';
import { Team } from '../entity';
import { TeamService } from '../services';

export class TeamController {
    private teamService: TeamService;

    constructor() {
        this.teamService = new TeamService();
    }

    async save(req: Request, res: Response) {
        try {
            const { teamName, userId } = req.body;

            const newTeam = new Team();
            newTeam.teamName = teamName;

            const savedTeam = await this.teamService.create(newTeam, userId);

            return res.status(201).json(savedTeam);
        } catch (error) {
            console.error('Error al guardar el usuario al team:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async addUsers(req: Request, res: Response) {
        try {
            const { usersId, teamId } = req.body;

            const savedTeam = await this.teamService.addUsers(teamId, usersId);
            return res.status(201).json(savedTeam);
        } catch (err) {
            console.error('Error al agregar usuarios al Team', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getTeam(req: Request, res: Response, teamId: number) {
        try {
            const team = await this.teamService.getTeam(teamId);
            return res.status(201).json(team);
        } catch (err) {
            console.error('Error al buscar un Team', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
export default new TeamController();
