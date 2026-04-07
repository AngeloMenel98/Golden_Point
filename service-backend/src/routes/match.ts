import { Router } from "express";
import { matchController, setController } from "../controllers";
import { check } from "express-validator";

import validationMsg from "../constants/validationMessages";

const router = Router();

router.get(
  "/matches/:tournamentId/:category/:groupStage",
  matchController.getMatches.bind(matchController)
);

// Update match sets (new format)
router.put(
  "/matches/:matchId",
  [
    check("matchId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("matchId")),
    check("userId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("userId")),
    check("setsTeam1")
      .isArray()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("setsTeam1")),
    check("setsTeam2")
      .isArray()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("setsTeam2")),
    check("teamsId")
      .isArray({ min: 2, max: 2 })
      .withMessage(validationMsg.VALUE_IS_REQUIRED("teamsId")),
  ],
  setController.create.bind(setController)
);

// Legacy update endpoint
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
