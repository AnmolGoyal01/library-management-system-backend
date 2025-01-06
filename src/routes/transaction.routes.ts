import { borrowBook, returnBook } from "../controllers/transaction.controllers";
import { verifyJwt } from "../middlewares/auth.middleware";
import express from "express";

const router = express.Router();

router.post("/borrow/:bookId", verifyJwt, borrowBook);
router.post("/return/:bookId", verifyJwt, returnBook);

export default router;