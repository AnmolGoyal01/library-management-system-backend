import express from "express";
import { getDashBoard } from "../controllers/dashboard.controllers";

const router = express.Router();

router.get("/", getDashBoard);

export default router;
