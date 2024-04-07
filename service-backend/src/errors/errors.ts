import {
    CustomError,
    UserServiceLogInError,
    UserServiceValidationError,
} from './errorsClass';

//Delete createError
export const createError = (status: number, message: string): CustomError => {
    return new CustomError(status, message);
};

export const isUserServiceValidationError = (
    error: unknown
): error is UserServiceValidationError =>
    typeof error === 'object' && error !== null && 'validationErrors' in error;

export const isUserServiceLogInError = (
    error: unknown
): error is UserServiceLogInError =>
    typeof error === 'object' && error !== null && 'user' in error;
