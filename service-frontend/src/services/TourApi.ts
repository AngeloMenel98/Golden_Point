import { isAxiosError } from "../errors/AxiosError";
import GeneralAPI from "./GeneralApi";

export interface DeletedTour {
  tourId: string;
  userId?: string;
}

export interface TourCredentials {
  userId?: string;
  clubsId: string[];
  title: string;
}

export interface JoinCredentials {
  userId?: string;
  tourCode: string;
}

class TourAPI extends GeneralAPI {
  async addTour(newTour: TourCredentials) {
    try {
      const res = await this.api.post("/tour/create", newTour);
      return res.data;
    } catch (e) {
      return isAxiosError(e);
    }
  }

  async getTours(userId: string) {
    try {
      const res = await this.api.get(`/tour/tours/${userId}`);
      return res.data;
    } catch (e) {
      return isAxiosError(e);
    }
  }

  async deleteTour(deletedTour: DeletedTour) {
    try {
      const res = await this.api.post("/tour/delete", deletedTour);
      return res.data;
    } catch (e) {
      return isAxiosError(e);
    }
  }

  async joinUser(joinCredentials: JoinCredentials) {
    try {
      const res = await this.api.post("/tour/join", joinCredentials);
      return res.data;
    } catch (e) {
      return isAxiosError(e);
    }
  }
}

export default TourAPI;
