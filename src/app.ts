import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ApiResponse from "./utils/ApiResponse";
import { API_VERSION } from "./constants";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   const errors = err.errors || [];

//   const response = new ApiResponse(statusCode, { errors }, message);
//   res.status(statusCode).json(response);
// });

// Routes import
import userRouter from "./routes/user.routes";
import healthCheckRouter from "./routes/healthCheck.routes";
import bookRouter from "./routes/book.routes";
import transactionRouter from "./routes/transaction.routes";
import dashBoardRouter from "./routes/dashBoard.routes";

// Routes declare
app.use(`${API_VERSION}/user`, userRouter);
app.use(`${API_VERSION}/health-check`, healthCheckRouter);
app.use(`${API_VERSION}/books`, bookRouter);
app.use(`${API_VERSION}/transactions`, transactionRouter);
app.use(`${API_VERSION}/dashboard`, dashBoardRouter);

export default app;
