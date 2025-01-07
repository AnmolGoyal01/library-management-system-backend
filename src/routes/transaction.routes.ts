import { borrowBook, returnBook, getBorrowedBooksByUser } from "../controllers/transaction.controllers";
import { verifyJwt } from "../middlewares/auth.middleware";
import express from "express";

const router = express.Router();

router.post("/borrow/:bookId", verifyJwt, borrowBook);
router.post("/return/:bookId", verifyJwt, returnBook);
router.get("/borrowed", verifyJwt, getBorrowedBooksByUser);

export default router;