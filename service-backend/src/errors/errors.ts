import { ServiceCodeError, UserServiceError } from "./errorsClass";

/**
 * Este archivo proporciona funciones para verificar y manejar los 
   diferentes tipos de errores definidos en errorClass.ts.  
*/

//-------------------- User Errors ----------------------------------------

/**
 * Funcion isUserServiceError
   - Toma un parámetro error de tipo desconocido y devuelve un valor booleano indicando si el 
     error es una instancia de UserServiceError.
   - Verifica si el error es un objeto y si tiene una propiedad llamada user. Si es así, devuelve
     true, de lo contrario, devuelve false.
*/
export const isUserServiceError = (error: unknown): error is UserServiceError =>
  typeof error === "object" && error !== null && "user" in error;

//---------------------- Service Code Errors ----------------------------------

export const isServiceCodeError = (error: unknown): error is ServiceCodeError =>
  typeof error === "object" && error !== null;
