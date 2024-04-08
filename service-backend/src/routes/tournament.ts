import { Router } from 'express';
import { check } from 'express-validator';
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
    tournController.create.bind(tournController)
);

export default router;
