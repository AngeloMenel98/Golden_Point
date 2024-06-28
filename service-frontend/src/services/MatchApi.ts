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
      console.log(
        `/matches/${matchAtts.tournId}/${matchAtts.category}/${matchAtts.grpStage}`
      );
      const res = await this.api.get(
        `/matches/${matchAtts.tournId}/${matchAtts.category}/${matchAtts.grpStage}`
      );
      return res.data;
    } catch (e) {
      isAxiosError(e);
    }
  }
}

export default MatchAPI;
