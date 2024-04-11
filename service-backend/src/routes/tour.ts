import { Router } from 'express';
import { check } from 'express-validator';
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
    tourController.create.bind(tourController)
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
    tourController.joinUser.bind(tourController)
);

router.post(
    '/tour/delete',
    [
        check('tourId')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('tourId')),
        check('userId')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('userId')),
    ],
    tourController.delete.bind(tourController)
);

router.get('/tour/tours', tourController.getAll.bind(tourController));

export default router;
