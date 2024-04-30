import GeneralAPI from "./GeneralApi";

export interface Credentials {
  username: string;
  password: string;
}

class UserAPI extends GeneralAPI {
  async login(credentials: Credentials) {
    try {
      const res = await this.api.post("/login", credentials);
      return res.data.token;
    } catch (error) {
      throw error;
    }
  }

  async register() {
    try {
      return this.api.post("/create");
    } catch (e) {}
  }
}

export default UserAPI;
