import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import validationMsg from '../constants/validationMessages';
import tourController from '../controllers/tourController';

const router = Router();

router.post(
    '/tour/create',
    [
        check('title')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('title')),
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
            const tour = await tourController.create(req, res);
            res.status(201).json(tour);
        } catch (err) {
            console.error('Error registering user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

export default router;
