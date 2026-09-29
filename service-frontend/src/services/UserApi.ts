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
  async login(credentials: Credentials): Promise<string> {
    const res = await this.api.post<{ token: string }>("/login", credentials);
    // Axios types don't know the interceptor unwraps; assert the runtime behavior
    return (res as unknown as { token: string }).token;
  }

  async register(_data: DataRegister): Promise<void> {
    await this.api.post("/register", _data);
  }

  async getUsers(tourId: string): Promise<unknown[]> {
    const res = await this.api.get(`/users/${tourId}`);
    return res as unknown as unknown[];
  }

  async getRanking(tourId: string | undefined, category: string): Promise<unknown[]> {
    const res = await this.api.get(`/user/${tourId}/${category}`);
    return res as unknown as unknown[];
  }
}

export default UserAPI;
