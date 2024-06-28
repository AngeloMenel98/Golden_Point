import { Router } from "express";
import { matchController } from "../controllers";

const router = Router();

router.get(
  "/matches/:tournamentId/:category/:groupStage",
  matchController.getMatches.bind(matchController)
);

export default router;
