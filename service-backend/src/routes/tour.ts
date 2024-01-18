import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import validationMsg from '../constants/validationMessages';
import { tourController } from '../controllers';

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

            const { title, userId } = req.body;
            const { response, status } = await tourController.create(
                title,
                userId
            );

            return res.status(status).json(response);
        } catch (err) {
            console.error('Error registering user:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

router.post(
    '/tour/join',
    [
        check('tourCode')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('tourCode')),
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

            const { userId, tourCode } = req.body;
            const { response, status } = await tourController.joinUser(
                userId,
                tourCode
            );

            res.status(status).json(response);
        } catch (err) {
            console.error('Error adding user to tour:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

export default router;
