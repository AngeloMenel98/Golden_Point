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
 * Ruta de login
 
 * Definimos una ruta POST con el path '/login' que manejará las solicitudes de inicio de sesión de usuarios. 

 * userController.logIn.bind(userController): especificamos el controlador y el método que se ejecutarán cuando 
   se reciba una solicitud en esta ruta. En este caso, llama al método logIn del controlador UserController.
*/
router.post('/login', userController.logIn.bind(userController));





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
