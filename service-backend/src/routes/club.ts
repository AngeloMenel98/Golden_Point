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
            const club = await clubController.save(req, res);
            res.status(201).json(club);
        } catch (err) {
            console.error('Error creating team:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

export default router;
