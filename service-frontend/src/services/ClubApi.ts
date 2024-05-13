import GeneralAPI from "./GeneralApi";

export interface ClubCredentials {
  userId?: string;
  clubName: string;
  address: string;
  availableFrom: string;
  availableTo: string;
  courtsNumber: string;
}

class ClubAPI extends GeneralAPI {
  async getClubs() {
    try {
      const res = await this.api.get(`/club/clubs`);
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async addClub(club: ClubCredentials) {
    try {
      const res = await this.api.post("/club/create", club);
      return res.data;
    } catch (e) {
      throw e;
    }
  }
}

export default ClubAPI;
