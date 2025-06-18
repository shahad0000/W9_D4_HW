import { Router } from "express";
import {
    createCarDealer,
    getDealers,
    getDealer,
    updateDealer,
    deleteDealer,
  } from '../controllers/carDealer.controller';

const router = Router();

router.route('/')
  .get(getDealers)
  .post(createCarDealer);
router.route('/:id')
  .get(getDealer)
  .put(updateDealer)
  .delete(deleteDealer);

export default router; 
