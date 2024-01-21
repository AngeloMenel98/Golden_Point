import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import validationMsg from '../constants/validationMessages';
import { tournController } from '../controllers';

const router = Router();

router.post(
    '/tournament/create',
    [
        check('title')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('title')),
        check('tourId')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('tourId')),
        check('master')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('master')),
        check('categoryData')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('categoryData')),
    ],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { tourId, title, master, categoryData } = req.body;
            const { resp, status } = await tournController.create(
                tourId,
                title,
                master,
                categoryData
            );
            return res.status(status).json(resp);
        } catch (err) {
            console.error('Error registering tournament:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

export default router;
