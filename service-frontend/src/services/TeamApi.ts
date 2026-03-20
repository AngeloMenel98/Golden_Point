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
  async addTeam(_newTeam: TeamCredentials): Promise<unknown> {
    return this.api.post("/team/create", _newTeam);
  }

  async getTeams(tournamentId: string): Promise<unknown> {
    return this.api.get(`/teams/${tournamentId}`);
  }

  async deleteTournament(_deletedTeams: DeletedTeam): Promise<number> {
    const res = await this.api.post("/team/delete", _deletedTeams);
    return (res as unknown as number) ?? 0;
  }
}

export default TeamAPI;
