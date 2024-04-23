import { Router } from "express";
import { check } from "express-validator";
import validationMsg from "../constants/validationMessages";
import { tournController } from "../controllers";

const router = Router();

router.post(
  "/tournament/create",
  [
    check("title")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("title")),
    check("tourId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("tourId")),
    check("userId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("userId")),
    check("master")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("master")),
    check("categoryData")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("categoryData")),
  ],
  tournController.create.bind(tournController)
);

router.post(
  "/tournament/delete",
  [
    check("tournamentId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("tournamentId")),
    check("userId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("userId")),
  ],
  tournController.delete.bind(tournController)
);

router.post(
  "/tournament/start",
  [
    check("tournamentId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("tournamentId")),
    check("userId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("userId")),
    check("tourId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("tourId")),
  ],
  tournController.start.bind(tournController)
);

export default router;
