import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import validationMsg from '../constants/validationMessages';
import { userController } from '../controllers';

const router = Router();

const PASSWORD_LENGTH = 6;

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
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { username, password } = req.body;

            const { response, status } = await userController.logIn(
                username,
                password
            );
            return res.status(status).json(response);
        } catch (error) {
            console.error('Error loggin in:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
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
    async (req: Request, res: Response) => {
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
            const { response, status } = await userController.update(
                userId,
                password,
                isSingle,
                firstName,
                lastName,
                phoneNumber,
                location
            );

            res.status(status).json(response);
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

router.post(
    '/delete',
    [
        check('userId')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('userId')),
    ],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { userId } = req.body;
            const { response, status } = await userController.delete(userId);

            res.status(status).json(response);
        } catch (error) {
            console.error('Error deleting User:', error);
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
