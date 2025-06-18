import { Request, Response } from "express";
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from "../utils/http-status";
import Car from "../models/car";

export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { dealerId, carMakeId, name, price, year, color = "" } = req.body;

    if (!name) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: "Car name is required",
      });
      return;
    }

    const car = Car.create({
      dealerId,
      carMakeId,
      name,
      price,
      year,
      color,
    });
    res.status(CREATED).json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to create car",
    });
  }
};

export const getCars = async (_req: Request, res: Response): Promise<void> => {
  try {
    const cars = await Car.find();
    res.status(OK).json({
      success: true,
      data: cars,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch cars",
    });
  }
};

export const getCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "car not found",
      });
      return;
    }
    res.status(OK).json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch car",
    });
  }
};

export const getCarByDealerId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { dealerId } = req.params;
    const car = await Car.find({ dealerId });
    if (!car) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "car not found",
      });
      return;
    }
    res.status(OK).json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch car",
    });
  }
};

export const getCarBycarMakeId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { carMakeId } = req.params;
    const car = await Car.find({ carMakeId });
    if (!car) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "car not found",
      });
      return;
    }
    res.status(OK).json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch car",
    });
  }
};

export const updateCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!car) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "Car not found",
      });
      return;
    }
    res.status(OK).json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to update car",
    });
  }
};

export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Car.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "Car not found",
      });
      return;
    }
    res.status(OK).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete car",
    });
  }
};
