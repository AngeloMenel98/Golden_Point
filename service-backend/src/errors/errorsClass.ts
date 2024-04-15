import { ValidationError } from 'class-validator';

export class ServiceValidationError extends Error {
    validationErrors: ValidationError[];

    constructor(message: string, validationErrors: ValidationError[]) {
        super(message);
        this.validationErrors = validationErrors;
    }
}

export class UserServiceError extends Error {
    user: string;

    constructor(messsage: string, user: string) {
        super(messsage);
        this.user = user;
    }
}

export class ServiceCodeError extends Error {
    code: string;

    constructor(messsage: string, code: string) {
        super(messsage);
        this.code = code;
    }
}
