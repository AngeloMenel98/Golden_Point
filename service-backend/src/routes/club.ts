import { Router } from "express";
import { check } from "express-validator";
import validationMsg from "../constants/validationMessages";
import { clubController } from "../controllers";

const router = Router();

router.post(
  "/club/create",
  [
    check("clubName")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Nombre del Club")),
    check("address")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Dirección")),
    check("tourId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("tourId")),
    check("userId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("userId")),
    check("availableFrom")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Horario Inicial")),
    check("availableTo")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Horario Final")),
  ],
  clubController.create.bind(clubController)
);

router.get("/club/clubs", clubController.getAll.bind(clubController));

export default router;
