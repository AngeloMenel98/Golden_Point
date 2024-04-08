import { ValidationError } from 'class-validator';

export class ServiceValidationError extends Error {
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

export class UserServiceError extends Error {
    userId: string;

    constructor(messsage: string, userId: string) {
        super(messsage);
        this.userId = userId;
    }
}

export class TourServiceError extends Error {
    userId: string;

    constructor(messsage: string, userId: string) {
        super(messsage);
        this.userId = userId;
    }
}

export class ServiceCodeError extends Error {
    code: string;

    constructor(messsage: string, code: string) {
        super(messsage);
        this.code = code;
    }
}
