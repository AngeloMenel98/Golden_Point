import GeneralAPI from "./GeneralApi";
import { isAxiosError } from "../errors/AxiosError";

export interface MatchAtts {
  tournId: string;
  category: string;
  grpStage: string;
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
}

export default MatchAPI;
