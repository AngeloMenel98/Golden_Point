import axios from "axios";
import GeneralAPI from "./GeneralApi";
import { TourFieldErrors, errorMappings } from "../errors/TourErrors";

interface ClubError {
  msg: string;
}

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
      if (axios.isAxiosError(e)) {
        if (e.response?.data?.error && e.response.data.error.length > 0) {
          const errorMessages: ClubError[] = e.response.data.error;

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
}

export default ClubAPI;
