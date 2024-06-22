import axios from "axios";
import { Errors, errorMappings } from "./Errors";

interface ErrorMsg {
  msg: string;
}

export const isAxiosError = (e: unknown) => {
  if (axios.isAxiosError(e)) {
    if (e.response?.data?.error && e.response.data.error.length > 0) {
      const errorMessages: ErrorMsg[] = e.response.data.error;

      const fieldErrors: Errors = {};

      errorMessages.forEach((error) => {
        const fieldName = errorMappings[error.msg];

        if (fieldName) {
          fieldErrors[fieldName] = error.msg;
        } else {
          fieldErrors.general = error.msg;
        }
      });
      return { fieldErrors };
    }
  }
};
