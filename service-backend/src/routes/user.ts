import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import validationMsg from '../constants/validationMessages';
import userController from '../controllers/userController';

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
    ],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const user = await userController.save(req, res);

            res.status(201).json(user);
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

export default router;
