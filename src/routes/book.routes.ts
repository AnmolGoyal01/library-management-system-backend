import express from "express";
import {
  getAvailableBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/book.controllers";
import { verifyJwt, adminOnly } from "../middlewares/auth.middleware";

const router = express.Router();

// Public Routes
router.get("/", getAvailableBooks); // Get available books
router.get("/:bookId", getBookById); // Get book by ID

// Admin Routes
router.post("/", verifyJwt, adminOnly, addBook); // Add a new book
router.put("/:bookId", verifyJwt, adminOnly, updateBook); // Update book details
router.delete("/:bookId", verifyJwt, adminOnly, deleteBook); // Delete book

export default router;
