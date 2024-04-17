import { check } from 'express-validator';
import validationMsg from '../constants/validationMessages';
import { userController } from '../controllers';
import { Router } from 'express';


/**
 * Creacion de Router: creaamos una instancia de Router de Express.
 */
const router = Router();

const PASSWORD_LENGTH = 6;


/**
 * Definimos la ruta de login. 
* Definimos una ruta POST con el path '/login' que manejará las solicitudes de inicio de sesión de usuarios.
 
 * [...]: especifica un array de middlewares que se ejecutarán antes de manejar la solicitud. En este caso, se 
   utilizan los middlewares proporcionados por express-validator para validar los campos de entrada (username 
   y password: 
   - Validacion para username: aseguramos de que el campo no esté vacío y, si lo está, se proporciona un mensaje 
     de error personalizado.
   - Validacion para password: aseguramos de que el campo no esté vacío y, si lo está, se proporciona un mensaje 
     de error personalizado.
 
 * userController.logIn.bind(userController): especificamos el controlador y el método que se ejecutarán cuando 
   se reciba una solicitud en esta ruta. En este caso, llama al método logIn del controlador UserController.
*/
router.post(
    '/login',
    [
        check('username')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('username')),
        check('password')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('password')),
    ],
    userController.logIn.bind(userController)
);





router.post(
    '/register',
    [
        check('username')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('username')),
        check('email')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('email')),
        check('password')
            .not()
            .isEmpty()
            .isLength({ min: PASSWORD_LENGTH })
            .withMessage(
                validationMsg.PASSWORD_LENGTH_RESTRICTION(PASSWORD_LENGTH)
            ),
        check('firstName')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('firstName')),
        check('lastName')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('lastName')),
        check('phoneNumber')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('phoneNumber')),
        check('location')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('location')),
    ],
    userController.create.bind(userController)
);

router.post(
    '/update',
    [
        check('userId')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('userId')),
    ],
    userController.update.bind(userController)
);

router.post(
    '/delete',
    [
        check('userId')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('userId')),
    ],
    userController.delete.bind(userController)
);

router.get('/:username', userController.findByUsername.bind(userController));

export default router;
