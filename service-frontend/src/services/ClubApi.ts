import GeneralAPI from "./GeneralApi";
import { isAxiosError } from "../errors/AxiosError";

export interface ClubCredentials {
  userId?: string;
  clubName: string;
  address: string;
  availableFrom: string;
  availableTo: string;
  courtsNumber: string;
}

<<<<<<< HEAD
class ClubAPI extends GeneralAPI {
  async getClubs() {
    try {
      const res = await this.api.get(`/club/clubs`);
=======
export interface UpdateClub {
  userId?: string;
  clubId: string;
  clubName: string;
  location: string;
  avFrom: string;
  avTo: string;
}

class ClubAPI extends GeneralAPI {
  async getClubs(userId: string) {
    try {
      const res = await this.api.get(`/club/clubs/${userId}`);
      return res.data;
    } catch (e) {
      isAxiosError(e);
    }
  }

  async getClubsPerTour(userId: string, tourId: string | undefined) {
    try {
      const res = await this.api.get(`/clubs/${userId}/${tourId}`);
>>>>>>> develop
      return res.data;
    } catch (e) {
      isAxiosError(e);
    }
  }

  async addClub(club: ClubCredentials) {
    try {
      const res = await this.api.post("/club/create", club);
      return res.data;
    } catch (e) {
      return isAxiosError(e);
    }
  }
<<<<<<< HEAD
=======

  async updateClub(club: UpdateClub) {
    try {
      const res = await this.api.post("/club/update", club);
      return res.data;
    } catch (e) {
      return isAxiosError(e);
    }
  }
>>>>>>> develop
}

export default ClubAPI;
