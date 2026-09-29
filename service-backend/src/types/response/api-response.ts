import { ErrorType } from "../error/error-type";

export type ApiResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: ErrorType };

export const success = <T>(data: T): ApiResponse<T> => ({ success: true, data });

export const failure = (error: ErrorType): ApiResponse<never> => ({ success: false, error });
