import axios from "axios";
import GeneralAPI from "./GeneralApi";
import { TourFieldErrors, errorMappings } from "../errors/TourErrors";

interface TourError {
  msg: string;
}

export interface DeletedTour {
  tourId: string;
  userId?: string;
}

export interface TourCredentials {
  userId?: string;
  clubsId: string[];
  title: string;
}

class TourAPI extends GeneralAPI {
  async addTour(newTour: TourCredentials) {
    try {
      const res = await this.api.post("/tour/create", newTour);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data?.error && e.response.data.error.length > 0) {
          const errorMessages: TourError[] = e.response.data.error;

          const fieldErrors: TourFieldErrors = {};

          errorMessages.forEach((error) => {
            const fieldName = errorMappings[error.msg];

            if (fieldName) {
              fieldErrors[fieldName] = error.msg;
            } else {
              fieldErrors.general = "An unexpected error occurred";
            }
          });
          return { fieldErrors };
        }
      }
    }
  }

  async getTours(userId: string) {
    try {
      const res = await this.api.get(`/tour/tours/${userId}`);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data?.error && e.response.data.error.length > 0) {
          const errorMessages: TourError[] = e.response.data.error;

          const fieldErrors: TourFieldErrors = {};

          errorMessages.forEach((error) => {
            const fieldName = errorMappings[error.msg];

            if (fieldName) {
              fieldErrors[fieldName] = error.msg;
            } else {
              fieldErrors.general = "An unexpected error occurred";
            }
          });

          return { fieldErrors };
        }
      }
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
