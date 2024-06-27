import { Router } from "express";
import { check } from "express-validator";
import validationMsg from "../constants/validationMessages";
import { matchController } from "../controllers";

const router = Router();

router.post(
  "/match/create",
  [
    check("amountTourPoints")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("amountTourPoints")),
    check("amountTourCoins")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("amountTourCoins")),
    check("matchDate")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("matchDate")),
    check("teamIds")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("teamIds")),
    check("tournamentId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("tournamentId")),
    check("courtId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("courtId")),
  ],
  matchController.create.bind(matchController)
);

export default router;
