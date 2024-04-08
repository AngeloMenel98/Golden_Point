import {
    ServiceCodeError,
    TourServiceError,
    UserServiceError,
    ServiceValidationError,
} from './errorsClass';

//-------------------- User Errors ----------------------------------------
export const isUserServiceValidationError = (
    error: unknown
): error is ServiceValidationError =>
    typeof error === 'object' && error !== null && 'validationErrors' in error;

export const isUserServiceError = (error: unknown): error is UserServiceError =>
    typeof error === 'object' && error !== null && 'userId' in error;

//-------------------- Tour Errors ----------------------------------------
export const isTourServiceError = (error: unknown): error is TourServiceError =>
    typeof error === 'object' && error !== null && 'userId' in error;

export const isServiceCodeError = (error: unknown): error is ServiceCodeError =>
    typeof error === 'object' && error !== null && 'code' in error;
