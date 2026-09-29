import { ApiResponse, success, failure } from "../types/response/api-response";
import {
  isNotFoundError,
  isValidationError,
  isInternalError,
} from "../types/error/error-guards";
import { ErrorType } from "../types/error/error-type";

export class TourCoinController {
    private handleError(e: unknown): ErrorType {
        if (isNotFoundError(e)) return e;
        if (isValidationError(e)) return e;
        if (isInternalError(e)) return e;
        return { type: "INTERNAL", message: "Internal server error" };
    }

    private getErrorStatus(e: unknown): number {
        if (isNotFoundError(e)) return 404;
        if (isValidationError(e)) return 400;
        return 500;
    }
}

export default new TourCoinController();
