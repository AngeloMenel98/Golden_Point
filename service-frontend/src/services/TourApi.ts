import GeneralAPI from "./GeneralApi";

export interface DeletedTour {
  tourId: string;
  userId: string;
}

export interface TourCredentials {
  userId: string;
  clubsId: string[];
  title: string;
}

class TourAPI extends GeneralAPI {
  async addTour(newTour: TourCredentials) {
    try {
      const res = await this.api.post("/tour/create", newTour);
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async getTours(userId: string) {
    try {
      const res = await this.api.get(`/tour/tours/${userId}`);
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async deleteTour(deletedTour: DeletedTour) {
    try {
      const res = await this.api.post("/tour/delete", deletedTour);
      return res.data;
    } catch (e) {
      throw e;
    }
  }
}

export default TourAPI;
