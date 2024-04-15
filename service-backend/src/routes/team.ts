import { Router } from 'express';
import { check } from 'express-validator';
import validationMsg from '../constants/validationMessages';
import { teamController } from '../controllers';

const router = Router();

router.post(
    '/team/create',
    [
        check('adminUserId')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('adminUserId')),
        check('usersId')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('usersId')),
        check('tournamentId')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('tournamentId')),
    ],
    teamController.create.bind(teamController)
);

router.get('/team/:id', teamController.getTeam.bind(teamController));

export default router;
