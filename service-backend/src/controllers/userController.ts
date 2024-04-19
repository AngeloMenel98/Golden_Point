import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import { PersonalData, TourCoin, User } from '../entity';
import { UserService } from '../services';
import { UserRole } from '../entity/User';
import { isServiceCodeError, isUserServiceError, isUserServiceValidationError } from '../errors/errors';



/**
 * Definimos el controlador UserController.
 * Metodos:
        - logIn
 */
export class UserController {
    private userService: UserService;

    /*Constructor: inicializa una instancia del servicio UserService.*/
    constructor() {
        this.userService = new UserService();
    }



    /**
     * Metodo logIn: maneja la solicitud de inicio de sesión de un usuario.    
     * validationResult(req): valida los datos de entrada de la solicitud utilizando las reglas de validación 
       definidas en los controladores correspondientes.
       - Si hay errores de validación, devuelve una respuesta con un estado 400 (Bad Request) y los errores 
         de validación.

     * req.body: obtiene los datos de inicio de sesion del cuerpo de la solicitud.
    
     * this.userService.logIn(username, password): llama al metodo logIn del servicio UserService para verificar 
       las credenciales de inicio de sesion del usuario.
       - Si las credenciales son validas, devuelve los datos del usuario.

     * jwt.sign(response, secretKey): genera un token JWT utilizando los datos del usuario y una clave secreta 
       almacenada en las variables de entorno.
    
     * Se retorna una respuesta con el token JWT generado en caso de éxito.

     * Manejo de error:
       - Si el error, es un error personalizado del servicio, devuelve una respuesta con un estado 400 y el 
         mensaje de error.
       - Caso contrario, devuelve una respuesta con un estado 500 (Internal Server Error).
    */
    async logIn(req: Request, res: Response) {
        try {
            
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { username, password } = req.body;

            const user = await this.userService.logIn(username, password);

            const response = {
                id: user.id,
                username: user.username,
                email: user.email,
                isSingle: user.isSingle,
            };

            const secretKey = process.env.JWT_SECRET_KEY;
            const token = jwt.sign(response, secretKey);

            const tokenJSON = {
                token: token,
            };

            res.status(201).json(tokenJSON);
        } catch (e) {
            console.error('Error Loggin In', e);

            if (isUserServiceError(e)) {
                res.status(400).json({ error: e.message });
                return;
            }

            res.status(500).json({ error: 'Internal Server Error' });
        }
    }





    async create(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const {
                username,
                email,
                password,
                firstName,
                lastName,
                location,
                phoneNumber,
            } = req.body;

            const newUser = new User();
            newUser.username = username;
            newUser.email = email;
            newUser.hashPassword(password);
            newUser.isSingle = true;
            newUser.role = UserRole.USER;

            const newPerData = new PersonalData();
            newPerData.firstName = firstName;
            newPerData.lastName = lastName;
            newPerData.location = location;
            newPerData.phoneNumber = phoneNumber;

            const newTourCoin = new TourCoin();
            newTourCoin.coins = 0;

            const user = await this.userService.create(
                newUser,
                newPerData,
                newTourCoin
            );

            const response = {
                id: user.id,
                username: user.username,
                email: user.email,
                isSingle: user.isSingle,
            };

            res.status(201).json(response);
        } catch (e: unknown) {
            console.error('Error creating user:', e);

            if (isUserServiceValidationError(e)) {
                res.status(400).json({ error: 'Validation error' });
                return;
            }

            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {
                userId,
                password,
                isSingle,
                firstName,
                lastName,
                phoneNumber,
                location,
            } = req.body;

            const user = await this.userService.findById(userId);

            const updatedUser = new User();
            updatedUser.username = user.username;
            updatedUser.email = user.email;
            updatedUser.hashPassword(password);
            updatedUser.isSingle = isSingle;
            updatedUser.role = UserRole.USER;

            const updatedPerData = new PersonalData();
            updatedPerData.firstName = firstName;
            updatedPerData.lastName = lastName;
            updatedPerData.phoneNumber = phoneNumber;
            updatedPerData.location = location;

            const resUser = await this.userService.update(
                updatedUser,
                user,
                updatedPerData
            );

            const response = {
                id: resUser.id,
                username: resUser.username,
                email: resUser.email,
                isSingle: resUser.isSingle,
            };

            res.status(201).json(response);
        } catch (e) {
            console.error('Error updating user:', e);

            if (isUserServiceValidationError(e)) {
                res.status(400).json({ error: 'Validation error' });
                return;
            }

            if (isServiceCodeError(e)) {
                res.status(400).json({ error: e.code });
            }

            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { userId } = req.body;
            const user = await this.userService.findById(userId);

            const resp = await this.userService.delete(user);
            const response = {
                id: resp.id,
                username: resp.username,
                email: resp.email,
                isSingle: resp.isSingle,
            };
            res.status(201).json(response);
        } catch (e) {
            console.error(e);
            return {
                response: { error: 'Error deleting User' },
                status: 500,
            };
        }
    }

    async findByUsername(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { username } = req.params;
            const resp = await this.userService.findByUsername(username);

            const response = {
                id: resp.id,
                username: resp.username,
                email: resp.email,
                isSingle: resp.isSingle,
            };
            res.status(201).json(response);
        } catch (e) {
            console.error('Error finding username:', e);

            if (isUserServiceError(e)) {
                res.status(400).json({ error: e.message });
                return;
            }

            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new UserController();
