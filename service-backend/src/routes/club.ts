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
    check("userId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("userId")),
    check("availableFrom")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Fecha Inicial")),
    check("availableTo")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Fecha Final")),
    check("courtsNumber")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Cantidad de canchas")),
  ],
  clubController.create.bind(clubController)
);

router.post(
  "/club/update",
  [
    check("clubName")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Nombre del Club")),
    check("location")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Dirección")),
    check("userId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("userId")),
    check("clubId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("clubId")),
    check("avFrom")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Fecha Inicial")),
    check("avTo")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Fecha Final")),
  ],
  clubController.updateClub.bind(clubController)
);

router.get("/club/clubs/:userId", clubController.getAll.bind(clubController));
router.get(
  "/clubs/:userId/:tourId",
  clubController.getClubsPerTour.bind(clubController)
);

export default router;
