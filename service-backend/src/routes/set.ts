import { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import validationMsg from "../constants/validationMessages";
import { setController } from "../controllers";

const router = Router();

router.post(
  "/set/create",
  [
    check("userId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("userId")),
    check("setsTeam1")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("setsTeam1")),
    check("setsTeam2")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("setsTeam2")),
    check("matchId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("matchId")),
    check("teamsId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("teamsId")),
  ],
  setController.create.bind(setController)
);

export default router;
