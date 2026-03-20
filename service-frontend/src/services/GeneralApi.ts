import axios, { AxiosInstance } from "axios";

class GeneralAPI {
  protected api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "/api",
    });
  }
}

export default GeneralAPI;
