import axios, { AxiosError } from "axios";
import { Errors, errorMappings } from "./Errors";
import { ApiErrorPayload } from "./ApiError";

export function parseApiError(e: unknown): ApiErrorPayload | null {
  if (!axios.isAxiosError(e)) return null;

  const data = (e as AxiosError).response?.data as Record<string, unknown> | undefined;

  // Backend field-validation errors: { error: ErrorType }
  // where ErrorType = { msg: string }[]
  if (data?.error && Array.isArray(data.error)) {
    const errorMessages = data.error as { msg?: string }[];
    if (errorMessages.length > 0) {
      const fieldErrors: Errors = {};
      errorMessages.forEach((error) => {
        const fieldName = errorMappings[error.msg ?? ""];

        if (fieldName) {
          fieldErrors[fieldName] = error.msg ?? "";
        } else {
          fieldErrors.general = error.msg ?? "";
        }
      });

      return { fieldErrors };
    }
  }

  // Generic error message: { error: "string" }
  if (typeof data?.error === "string") {
    return { message: data.error };
  }

  // Network / unexpected errors
  return { message: e.message || "Network error" };
}
