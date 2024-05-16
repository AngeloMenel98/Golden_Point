import { isAxiosError } from "../errors/AxiosError";
import GeneralAPI from "./GeneralApi";

export interface Credentials {
  username: string;
  password: string;
}

export interface DataRegister {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
}

class UserAPI extends GeneralAPI {
  async login(credentials: Credentials) {
    try {
      const res = await this.api.post("/login", credentials);
      return res.data.token;
    } catch (e) {
      throw e;
    }
  }

  async register(data: DataRegister) {
    try {
      const res = await this.api.post("/register", data);
      return res.data;
    } catch (e) {
      isAxiosError(e);
    }
  }
}

export default UserAPI;
