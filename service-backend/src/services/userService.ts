import { PerDataRepository, UserRepository } from '../repository';
import { PersonalData, TourCoin, User } from '../entity';
 
import { validate } from 'class-validator';
import { UserServiceError, ServiceValidationError, ServiceCodeError } from '../errors/errorsClass';




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
        
        if (!username) {
            throw new UserServiceError('El campo nombre de usuario es obligatorio', username);
        };

        if (!password) {
            throw new UserServiceError('El campo contraseña es obligatorio', password);
        };
    
        const existingUser = await UserRepository.findOneBy({
            username: username,
        });

        if (!existingUser) {
            throw new UserServiceError('El nombre de usuario ingresado no existe', username);
        }

        if (!existingUser.compareHashPass(password)) {
            throw new UserServiceError('La contraseña ingresada es incorrecta', existingUser.id);
        }

        return existingUser;
    }







    async create(user: User, perData: PersonalData, tourCoin: TourCoin) {
        const userErrors = await validate(user);
        const perErrors = await validate(perData);

        if (userErrors.length > 0 || perErrors.length > 0) {
            // TODO: can be done better (identify if user or personal data error, better message, etc)
            throw new ServiceValidationError(
                'Validation error',
                perErrors.concat(perErrors)
            );
        }

        return UserRepository.create(user, perData, tourCoin);
    }

    async update(user: User, existingUser: User, perData: PersonalData) {
        const userErrors = await validate(user);
        const perErrors = await validate(perData);

        if (userErrors.length > 0 || perErrors.length > 0) {
            // TODO: can be done better (identify if user or personal data error, better message, etc)
            throw new ServiceValidationError(
                'Validation error',
                perErrors.concat(perErrors)
            );
        }

        const existingPerData = await PerDataRepository.findByUserId(
            existingUser.id
        );

        if (!existingPerData) {
            throw new ServiceCodeError(
                'Personal Data does not exist',
                'UserS-2'
            );
        }

        return UserRepository.update(
            existingUser,
            existingPerData,
            user,
            perData
        );
    }

    async delete(user: User) {
        user.isDeleted = true;
        return UserRepository.save(user);
    }

    async findByUsername(username: string) {
        const user = await UserRepository.findByUsername(username);

        if (!user) {
            throw new UserServiceError('Username does not exist', username);
        }

        return user;
    }

    async findById(userId: string) {
        const existingUser = await UserRepository.findOneBy({
            id: userId,
        });

        if (!existingUser) {
            throw new UserServiceError('User ID does not exist', userId);
        }
        return existingUser;
    }

    async findByIdWithPersonalData(userId: string) {
        const userData = await UserRepository.findUserWithPerData(userId);

        if (!userData) {
            throw new UserServiceError('User ID does not exist', userId);
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
