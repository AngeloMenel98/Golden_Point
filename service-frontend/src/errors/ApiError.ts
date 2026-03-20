import { Errors } from "./Errors";

export interface ApiErrorPayload {
  fieldErrors?: Errors;
  message?: string;
}

export class ApiError extends Error {
  constructor(
    public payload: ApiErrorPayload,
    public status?: number
  ) {
    super(payload.message ?? "Unknown error");
    this.name = "ApiError";
  }
}
