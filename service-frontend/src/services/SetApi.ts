import GeneralAPI from "./GeneralApi";
import { isAxiosError } from "../errors/AxiosError";

export interface SetAtts {
  userId: string | undefined;
  setsTeam1: string[];
  setsTeam2: string[];
  teamsId: string[];
  matchId: string;
  tournamentId: string;
}

class SetAPI extends GeneralAPI {
  async addSets(setAtts: SetAtts) {
    try {
      const res = await this.api.post(`/set/create`, setAtts);
      return res.data;
    } catch (e) {
      return isAxiosError(e);
    }
  }
}

export default SetAPI;
