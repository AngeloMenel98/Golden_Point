import { ValidationError } from 'class-validator';


export class ServiceValidationError extends Error {
    validationErrors: ValidationError[];

    constructor(message: string, validationErrors: ValidationError[]) {
        super(message);
        this.validationErrors = validationErrors;
    }
}



/**
 * Clase UserServiceError
 * Constructor: recibe los siguientes parametros:
   - message: representa el mensaje de error que se mostrará cuando se lance la excepción.
   - user: propiedad adicional que puede contener información relacionada con el usuario asociada 
     con el error.
 
 *  Cuando se lanza una instancia de UserServiceError, puede ser capturada y manejada en bloques 
    try...catch en el servicio del usuario. El mensaje de error proporcionado al constructor se puede 
    utilizar para mostrar información al usuario o para registrar el error en los registros de la 
    aplicación.
 */
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
