import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import validationMsg from '../constants/validationMessages';
import { matchController } from '../controllers';

const router = Router();

router.post(
    '/match/create',
    [
        check('amountTourPoints')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('amountTourPoints')),
        check('amountTourCoins')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('amountTourCoins')),
        check('matchDate')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('matchDate')),
        check('teamIds')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('teamIds')),
        check('tournamentId')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('tournamentId')),
        check('courtId')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('courtId')),
    ],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {
                amountTourPoints,
                amountTourCoins,
                matchDate,
                teamIds,
                tournamentId,
                courtId,
            } = req.body;
            const { resp, status } = await matchController.create(
                amountTourPoints,
                amountTourCoins,
                matchDate,
                teamIds,
                tournamentId,
                courtId
            );
            res.status(status).json(resp);
        } catch (err) {
            console.error('Error creating club:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

export default router;
