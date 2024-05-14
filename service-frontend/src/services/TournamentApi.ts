import GeneralAPI from "./GeneralApi";

export interface TournCredentials {
  userId?: string;
  clubsId: string[];
  title: string;
}

class TournamentAPI extends GeneralAPI {
  /*async addTournament(newTour: TournCredentials) {
    try {
      const res = await this.api.post("/tour/create", newTour);
      return res.data;
    } catch (e) {
      throw e;
    }
  }*/

  async getTournaments(tourId: string) {
    try {
      const res = await this.api.get(`/tournament/tourns/${tourId}`);
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  /*async deleteTour(deletedTour: DeletedTour) {
    try {
      const res = await this.api.post("/tour/delete", deletedTour);
      return res.data;
    } catch (e) {
      throw e;
    }
  }*/
}

export default TournamentAPI;
