import {
  healthCheck,
  protectedRoute,
  adminRoute,
} from "../controllers/healthCheck.controllers";
import { verifyJwt, adminOnly } from "../middlewares/auth.middleware";
import express from "express";

const router = express.Router();

router.get("/", healthCheck);
router.get("/protected", verifyJwt, protectedRoute);
router.get("/admin", verifyJwt, adminOnly, adminRoute);

export default router;
