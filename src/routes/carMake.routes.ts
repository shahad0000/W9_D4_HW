import { Router } from "express";
import {
  createCarMake,
  getCarMakes,
  getCarMake,
  updateMake,
  deleteMake,
} from "../controllers/carMake.controller";

const router = Router();

router.route("/").get(getCarMakes).post(createCarMake);
router.route("/:id").get(getCarMake).put(updateMake).delete(deleteMake);

export default router;
