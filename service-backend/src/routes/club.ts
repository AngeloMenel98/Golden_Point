import { Router } from 'express';
import { check } from 'express-validator';
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
        check('availableFrom')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('availableFrom')),
        check('availableTo')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('availableTo')),
    ],
    clubController.create.bind(clubController)
);

router.get('/club/clubs', clubController.getAll.bind(clubController));

export default router;
