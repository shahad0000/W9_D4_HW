import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import logger from "./utils/logger";
import { dev } from "./utils/helpers";
import carDealerRoute from "./routes/carDealer.routes";
import carMakeRoute from "./routes/carMake.routes";
import carsRoute from "./routes/car.routes";
import { OK, INTERNAL_SERVER_ERROR } from "./utils/http-status";
import { connectDB, deleteAllCollections } from './config/db';

dotenv.config();

// Delete all collections
deleteAllCollections();

// Connect to mongodb
connectDB();

// Load environment variables

const app: Express = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(
  morgan("tiny", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/car-dealers", carDealerRoute);
app.use("/api/car-make", carMakeRoute);
app.use("/api/car", carsRoute);

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.status(OK).json({ message: "Cars API - Welcome!" });
});

// Basic error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error("Error:", err.message);
  res.status(INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went wrong!",
    error: dev ? err.message : undefined,
  });
});

// Start server
app.listen(process.env.PORT || 3000, () => {
  logger.info(`Server is running on port ${process.env.PORT || 3000}`);
});
