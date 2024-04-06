import { ValidationError } from 'class-validator';

export class UserServiceValidationError extends Error {
    validationErrors: ValidationError[];

    constructor(message: string, validationErrors: ValidationError[]) {
        super(message);
        this.validationErrors = validationErrors;
    }
}
