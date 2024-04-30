import { AxiosResponse } from "axios";
import GeneralAPI from "./GeneralApi";

interface Credentials {
  username: string;
  password: string;
}

class UserAPI extends GeneralAPI {
  async login(credentials: Credentials): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.post("/login", credentials);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default UserAPI;
