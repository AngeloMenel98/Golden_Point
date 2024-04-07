import { ValidationError } from 'class-validator';

export class UserServiceValidationError extends Error {
    validationErrors: ValidationError[];

    constructor(message: string, validationErrors: ValidationError[]) {
        super(message);
        this.validationErrors = validationErrors;
    }
}

export class CustomError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export class UserServiceLogInError extends Error {
    user: string;

    constructor(messsage: string, user: string) {
        super(messsage);
        this.user = user;
    }
}
