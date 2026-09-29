import GeneralAPI from "./GeneralApi";

export interface ClubCredentials {
  userId?: string;
  clubName: string;
  address: string;
  availableFrom: string;
  availableTo: string;
  courtsNumber: string;
}

export interface UpdateClub {
  userId?: string;
  clubId: string;
  clubName: string;
  location: string;
  avFrom: string;
  avTo: string;
}

interface ClubData {
  id: string;
  clubName: string;
  address: string;
}

class ClubAPI extends GeneralAPI {
  async getClubs(userId: string): Promise<unknown> {
    return this.api.get(`/club/clubs/${userId}`);
  }

  async getClubsPerTour(userId: string, tourId: string | undefined): Promise<unknown> {
    return this.api.get(`/clubs/${userId}/${tourId}`);
  }

  async addClub(_club: ClubCredentials): Promise<ClubData> {
    const res = await this.api.post("/club/create", _club);
    return res as unknown as ClubData;
  }

  async updateClub(_club: UpdateClub): Promise<void> {
    await this.api.post("/club/update", _club);
  }
}

export default ClubAPI;
