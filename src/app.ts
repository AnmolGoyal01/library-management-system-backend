import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ApiResponse from "./utils/ApiResponse";
import { API_VERSION } from "./constants";

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const errors = err.errors || [];

  const response = new ApiResponse(statusCode, { errors }, message);
  res.status(statusCode).json(response);
});

// Routes import
import healthCheckRouter from "./routes/healthCheck.routes";

// Routes declare
app.use(`${API_VERSION}/health-check`, healthCheckRouter);

export default app;
