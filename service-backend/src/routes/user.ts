import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import validationMsg from '../constants/validationMessages';
import {
    perDataController,
    userController,
    tourCoinController,
} from '../controllers';

const router = Router();

const PASSWORD_LENGTH = 6;

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
        check('isSingle')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('isSingle')),
        check('userRole')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('userRole')),
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
        check('coins')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('coins')),
    ],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {
                username,
                email,
                password,
                isSingle,
                userRole,
                firstName,
                lastName,
                location,
                phoneNumber,
                coins,
            } = req.body;

            const { response, status } = await userController.create(
                username,
                email,
                password,
                isSingle,
                userRole,
                firstName,
                lastName,
                location,
                phoneNumber,
                coins
            );
            return res.status(status).json(response);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

router.post(
    '/update',
    [
        check('userId')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('userId')),
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
        check('isSingle')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('isSingle')),
        check('userRole')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('userROle')),
    ],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { userId, username, password, email, isSingle, userRole } =
                req.body;
            const { response, status } = await userController.update(
                userId,
                username,
                password,
                email,
                isSingle,
                userRole
            );

            res.status(status).json(response);
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

router.get('/:username', async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username } = req.params;
        const { response, status } = await userController.findByUsername(
            username
        );

        res.status(status).json(response);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
