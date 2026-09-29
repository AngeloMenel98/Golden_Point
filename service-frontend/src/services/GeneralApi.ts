import axios, { AxiosInstance, AxiosError } from "axios";
import { ApiError, ApiErrorPayload } from "../errors/ApiError";
import { parseApiError } from "../errors/parseApiError";

// ── Parse a raw Axios error into our unified payload ──
export { ApiError };
export type { ApiErrorPayload };
export { parseApiError };

class GeneralAPI {
  protected api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "/api",
    });

    // ── Response interceptor: unwrap { success: true, data } ──
    this.api.interceptors.response.use(
      (response) => {
        const payload = response.data;
        if (payload && payload.success === true) {
          // Replace axios response with the unwrapped data
          return payload.data;
        }
        // If success is missing or false, fall through to error interceptor
        return response;
      },
      (e: AxiosError) => {
        const parsed = parseApiError(e);
        if (parsed) {
          return Promise.reject(
            new ApiError(parsed, e.response?.status)
          );
        }
        return Promise.reject(e);
      }
    );
  }
}

export default GeneralAPI;
