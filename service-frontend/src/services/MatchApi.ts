import GeneralAPI from "./GeneralApi";

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
  async getMatches(matchAtts: MatchAtts): Promise<unknown> {
    return this.api.get(
      `/matches/${matchAtts.tournId}/${matchAtts.category}/${matchAtts.grpStage}`
    );
  }

  async updateMatch(_updateMatch: MatchCred): Promise<void> {
    await this.api.post("/matches/update", _updateMatch);
  }
}

export default MatchAPI;
