import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import validationMsg from '../constants/validationMessages';
import { setController } from '../controllers';

const router = Router();

router.post(
    '/set/create',
    [
        check('adminUserId')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('adminUserId')),
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
    setController.create.bind(setController)
);

export default router;
