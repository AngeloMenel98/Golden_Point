import {
    ServiceCodeError,
    UserServiceError,
    ServiceValidationError,
} from './errorsClass';

//-------------------- User Errors ----------------------------------------
export const isUserServiceValidationError = (
    error: unknown
): error is ServiceValidationError =>
    typeof error === 'object' && error !== null && 'validationErrors' in error;

export const isUserServiceError = (error: unknown): error is UserServiceError =>
    typeof error === 'object' && error !== null && 'user' in error;

//---------------------- Service Code Errors ----------------------------------

export const isServiceCodeError = (error: unknown): error is ServiceCodeError =>
    typeof error === 'object' && error !== null && 'code' in error;
