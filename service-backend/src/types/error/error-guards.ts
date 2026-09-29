import { ErrorType } from "./error-type";

export const isNotFoundError = (e: unknown): e is Extract<ErrorType, { type: "NOT_FOUND" }> =>
  typeof e === "object" && e !== null && "type" in e && (e as any).type === "NOT_FOUND";

export const isValidationError = (e: unknown): e is Extract<ErrorType, { type: "VALIDATION" }> =>
  typeof e === "object" && e !== null && "type" in e && (e as any).type === "VALIDATION";

export const isUnauthorizedError = (e: unknown): e is Extract<ErrorType, { type: "UNAUTHORIZED" }> =>
  typeof e === "object" && e !== null && "type" in e && (e as any).type === "UNAUTHORIZED";

export const isConflictError = (e: unknown): e is Extract<ErrorType, { type: "CONFLICT" }> =>
  typeof e === "object" && e !== null && "type" in e && (e as any).type === "CONFLICT";

export const isInternalError = (e: unknown): e is Extract<ErrorType, { type: "INTERNAL" }> =>
  typeof e === "object" && e !== null && "type" in e && (e as any).type === "INTERNAL";

export const isAppError = (e: unknown): e is ErrorType =>
  isNotFoundError(e) || isValidationError(e) || isUnauthorizedError(e) || isConflictError(e) || isInternalError(e);
