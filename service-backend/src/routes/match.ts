import { Router } from "express";
import { matchController } from "../controllers";
import { check } from "express-validator";

import validationMsg from "../constants/validationMessages";

const router = Router();

router.get(
  "/matches/:tournamentId/:category/:groupStage",
  matchController.getMatches.bind(matchController)
);

router.post(
  "/matches/update",
  [
    check("matchId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("matchId")),

    check("clubId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("clubId")),
    check("courtNumber")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Numero de Cancha")),
    check("matchDate")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Fecha")),
  ],
  matchController.updateMatch.bind(matchController)
);

export default router;
