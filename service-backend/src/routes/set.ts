import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import validationMsg from '../constants/validationMessages';
import { setController } from '../controllers';

const router = Router();

router.post(
    '/set/create',
    [
        check('gamesTeam1')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('gamesTeam1')),
        check('gamesTeam2')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('gamesTeam2')),
        check('matchId')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('matchId')),
    ],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { gamesTeam1, gamesTeam2, matchId } = req.body;
            const { resp, status } = await setController.create(
                gamesTeam1,
                gamesTeam2,
                matchId
            );
            res.status(status).json(resp);
        } catch (err) {
            console.error('Error creating club:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

export default router;
