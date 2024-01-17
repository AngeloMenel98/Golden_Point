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
    ],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const userResponse = await userController.save(req, res);
            const user = res.locals.user;

            if (user) {
                await perDataController.save(req, res, user.id);
                await tourCoinController.save(req, res, user.id);
            }
            res.status(201).json(user);
        } catch (error) {
            console.error('Error registering user:', error);
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
    ],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const user = await userController.update(req, res);

            res.status(201).json(user);
        } catch (error) {
            console.error('Error registering user:', error);
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
        const user = await userController.findByUsername(req, res);

        res.status(201).json(user);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
