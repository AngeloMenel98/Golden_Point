import GeneralAPI from "./GeneralApi";

class TourAPI extends GeneralAPI {
  async getTours() {
    try {
      const res = await this.api.get("/tour/tours");
      return res.data;
    } catch (e) {
      throw e;
    }
  }
}

export default TourAPI;
