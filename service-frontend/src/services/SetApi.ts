import GeneralAPI from "./GeneralApi";

export interface SetAtts {
  userId: string | undefined;
  setsTeam1: string[];
  setsTeam2: string[];
  teamsId: string[];
  matchId: string;
  tournamentId: string;
}

class SetAPI extends GeneralAPI {
  async addSets(_setAtts: SetAtts): Promise<void> {
    await this.api.post(`/set/create`, _setAtts);
  }
}

export default SetAPI;
