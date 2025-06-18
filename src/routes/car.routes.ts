import { Router } from "express";
import {
  createCar,
  getCars,
  getCar,
  getCarByDealerId,
  getCarBycarMakeId,
  updateCar,
  deleteCar,
} from "../controllers/cars.controller";

const router = Router();

router.route("/").get(getCars).post(createCar);
router.route("/:id").get(getCar).put(updateCar).delete(deleteCar);
router.route("/dealer/:dealerId").get(getCarByDealerId);
router.route("/car-make/:carMakeId").get(getCarBycarMakeId);

export default router;
