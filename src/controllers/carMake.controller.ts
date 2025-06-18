import { Request, Response } from "express";
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from "../utils/http-status";
import CarMake from "../models/carMake";

export const createCarMake = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { country, brand = "" } = req.body;

    if (!brand) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: "Brand name is required",
      });
      return;
    }

    const make = CarMake.create({ country, brand });
    res.status(CREATED).json({
      success: true,
      data: make,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create car make",
    });
  }
};

export const getCarMakes = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const dealers = await CarMake.find();
    res.status(OK).json({
      success: true,
      data: dealers,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch car make",
    });
  }
};

export const getCarMake = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const make = await CarMake.findById(req.params.id);
    if (!make) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "car make not found",
      });
      return;
    }
    res.status(OK).json({
      success: true,
      data: make,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch dealer",
    });
  }
};

export const updateMake = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const make = await CarMake.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!make) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "Car make not found",
      });
      return;
    }
    res.status(OK).json({
      success: true,
      data: make,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update car make",
    });
  }
};

export const deleteMake = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleted = await CarMake.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "Car make not found",
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
      error:
        error instanceof Error ? error.message : "Failed to delete car make",
    });
  }
};
