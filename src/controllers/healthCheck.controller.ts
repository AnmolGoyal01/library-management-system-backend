import { asyncHandler, ApiError, ApiResponse } from "../utils";
import { Request, Response, NextFunction } from "express";

const healthCheck = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(new ApiResponse(200, "OK", "Health check is OK"));
  }
);

const protectedRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(new ApiResponse(200, "OK", "Protected route is OK"));
  }
);

const adminRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(new ApiResponse(200, "OK", "Admin route is OK"));
  }
);

export { healthCheck, protectedRoute, adminRoute };
