import { isAxiosError } from "../errors/AxiosError";
import GeneralAPI from "./GeneralApi";

export interface DeletedTeam {
  teamsId: string[];
  userId?: string;
}

export interface TeamCredentials {
  adminUserId?: string;
  tournamentId?: string;
  category: string;
  usersId: string[];
}

class TeamAPI extends GeneralAPI {
  async addTeam(newTeam: TeamCredentials) {
    try {
      const res = await this.api.post("/team/create", newTeam);
      return res.data;
    } catch (e) {
      return isAxiosError(e);
    }
  }

  async getTeams(tournamentId: string) {
    try {
      const res = await this.api.get(`/teams/${tournamentId}`);
      return res.data;
    } catch (e) {
      return isAxiosError(e);
    }
  }

  async deleteTournament(deletedTeams: DeletedTeam) {
    try {
      const res = await this.api.post("/team/delete", deletedTeams);
      return res.data;
    } catch (e) {
      return isAxiosError(e);
    }
  }
}

export default TeamAPI;
