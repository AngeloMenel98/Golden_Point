import axios, { AxiosInstance } from "axios";

class GeneralAPI {
  protected api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://127.0.0.1:8081/api",
    });
  }
}

export default GeneralAPI;
