import GeneralAPI from "./GeneralApi";
import { isAxiosError } from "../errors/AxiosError";

export interface MatchAtts {
  tournId: string;
  category: string;
  grpStage: string;
}

export interface MatchCred {
  matchId: string;
  clubId: string;
  matchDate: string;
  courtNumber: string;
}

class MatchAPI extends GeneralAPI {
  async getMatches(matchAtts: MatchAtts) {
    try {
      const res = await this.api.get(
        `/matches/${matchAtts.tournId}/${matchAtts.category}/${matchAtts.grpStage}`
      );
      return res.data;
    } catch (e) {
      return isAxiosError(e);
    }
  }

  async updateMatch(updateMatch: MatchCred) {
    try {
      const res = await this.api.post("/matches/update", updateMatch);
      return res.data;
    } catch (e) {
      return isAxiosError(e);
    }
  }
}

export default MatchAPI;
