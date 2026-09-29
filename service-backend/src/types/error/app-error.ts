import { ErrorType } from "./error-type";

export const notFound = (entity: string, id: string): ErrorType => 
  ({ type: "NOT_FOUND", entity, id });

export const validationError = (message: string, field?: string): ErrorType => 
  ({ type: "VALIDATION", message, field });

export const unauthorized = (message: string): ErrorType => 
  ({ type: "UNAUTHORIZED", message });

export const conflict = (message: string, entity: string): ErrorType => 
  ({ type: "CONFLICT", message, entity });

export const internalError = (message: string): ErrorType => 
  ({ type: "INTERNAL", message });
