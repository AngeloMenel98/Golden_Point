import GeneralAPI from "./GeneralApi";

class ClubAPI extends GeneralAPI {
  async getClubs() {
    try {
      const res = await this.api.get("/club/clubs");
      return res.data;
    } catch (e) {
      throw e;
    }
  }
}

export default ClubAPI;
