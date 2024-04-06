import { UserServiceValidationError } from './errorsClass';

class CustomError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

//Delete createError
export const createError = (status: number, message: string): CustomError => {
    return new CustomError(status, message);
};

export const isUserServiceValidationError = (
    error: unknown
): error is UserServiceValidationError =>
    typeof error === 'object' && error !== null && 'validationErrors' in error;
