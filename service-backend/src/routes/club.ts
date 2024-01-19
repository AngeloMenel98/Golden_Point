import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import validationMsg from '../constants/validationMessages';
import { clubController } from '../controllers';

const router = Router();

router.post(
    '/club/create',
    [
        check('clubName')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('clubName')),
        check('location')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('location')),
        check('tourId')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('tourId')),
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

            const { clubName, tourId, location, userRole } = req.body;
            const { resp, status } = await clubController.create(
                clubName,
                tourId,
                location,
                userRole
            );
            res.status(status).json(resp);
        } catch (err) {
            console.error('Error creating club:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

export default router;
