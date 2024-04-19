import { PerDataRepository, UserRepository } from "../repository";
import { PersonalData, TourCoin, User } from "../entity";
import valMessage from "../constants/validationMessages";

import { validate } from "class-validator";
import {
  UserServiceError,
  ServiceValidationError,
  ServiceCodeError,
} from "../errors/errorsClass";

/**
 * Definimos el servicio UserService.
 * Metodos:
        - logIn
 */
export class UserService {
  /*Constructor: no realiza ninguna operacion al inicializar el servicio.*/
  constructor() {}

  /**
     * Metodo logIn: se utiliza para el inicio de sesión de un usuario. 
     * Recibe como parametros:    
        - username: nombre de usuario
        - password: contraseña del usuario

     * UserRepository.findOneBy: llama al DAO UserRepository para buscar en la base de datos un usuario 
        con el nombre de usuario proporcionado.

     * existingUser.compareHashPass(password): compara la contraseña proporcionada con la contraseña 
        almacenada en la base de datos para el usuario encontrado.

     * Validaciones:
        - Si no se ingresa username como parametro, se lanza un error de tipo UserServiceError indicando 
          que el campo nombre de usuario es requerido.
        - Si no se ingresa password como parametro, se lanza un error de tipo UserServiceError indicando 
          que el campo contraseña es requerido.
        - Si no se encuentra ningún usuario con el nombre de usuario ingresado, se lanza un error de tipo 
          UserServiceError indicando que el nombre de usuario ingresado no existe.
        - Si las contraseñas no coinciden, se lanza un error de tipo UserServiceError indicando que la 
          contraseña ingresada es incorrecta.
        - Si el usuario existe, y la contraseña es correcta, el metodo devuelve el usuario encontrado.     
    */
  async logIn(username: string, password: string) {
    const existingUser = await UserRepository.findOneBy({
      username: username,
    });

    if (!existingUser) {
      throw new UserServiceError(
        valMessage.VALUE_NOT_EXIST("Nombre de Usuario"),
        username
      );
    }

    if (!existingUser.compareHashPass(password)) {
      throw new UserServiceError(
        valMessage.VALUE_INCORRECT("Contraseña"),
        existingUser.id
      );
    }

    return existingUser;
  }

  async create(user: User, perData: PersonalData, tourCoin: TourCoin) {
    const userErrors = await validate(user);
    const perErrors = await validate(perData);

    if (userErrors.length > 0 || perErrors.length > 0) {
      throw new ServiceValidationError(
        "Validation error",
        userErrors.concat(perErrors)
      );
    }

    return UserRepository.create(user, perData, tourCoin);
  }

  async update(user: User, existingUser: User, perData: PersonalData) {
    const userErrors = await validate(user);
    const perErrors = await validate(perData);

    if (userErrors.length > 0 || perErrors.length > 0) {
      throw new ServiceValidationError(
        "Validation error",
        userErrors.concat(perErrors)
      );
    }

    const existingPerData = await PerDataRepository.findByUserId(
      existingUser.id
    );

    if (!existingPerData) {
      throw new ServiceCodeError(
        valMessage.VALUE_NOT_EXIST("Personal Data"),
        "UserS-2"
      );
    }

    return UserRepository.update(existingUser, existingPerData, user, perData);
  }

  async delete(user: User) {
    user.isDeleted = true;
    return UserRepository.save(user);
  }

  async findByUsername(username: string) {
    const user = await UserRepository.findByUsername(username);

    if (!user) {
      throw new UserServiceError(
        valMessage.VALUE_NOT_EXIST("UserName"),
        username
      );
    }

    return user;
  }

  async findById(userId: string) {
    const existingUser = await UserRepository.findOneBy({
      id: userId,
    });

    if (!existingUser) {
      throw new UserServiceError(valMessage.VALUE_NOT_EXIST("User ID"), userId);
    }
    return existingUser;
  }

  async findByIdWithPersonalData(userId: string) {
    const userData = await UserRepository.findUserWithPerData(userId);

    if (!userData) {
      throw new UserServiceError(valMessage.VALUE_NOT_EXIST("User ID"), userId);
    }

    const user = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      isSingle: userData.isSingle,
      isDeleted: userData.isDeleted,
      role: userData.role,
    };

    return { user: user, perData: userData.personalData };
  }
}
