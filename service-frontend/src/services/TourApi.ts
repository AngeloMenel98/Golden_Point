import GeneralAPI from "./GeneralApi";

export interface DeletedTour {
  tourId: string;
  userId: string;
}

class TourAPI extends GeneralAPI {
  async getTours() {
    try {
      const res = await this.api.get("/tour/tours");
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
