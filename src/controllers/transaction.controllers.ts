import { Request, Response, NextFunction } from "express";
import { asyncHandler, ApiResponse, ApiError } from "../utils";
import Transaction from "../models/transaction.model";
import Book from "../models/book.model";

interface verifiedRequest extends Request {
  user?: any;
}

const borrowBook = asyncHandler(
  async (req: verifiedRequest, res: Response, next: NextFunction) => {
    const { bookId } = req.params;
    if (!bookId) {
      throw new ApiError(400, "Book ID is required");
    }
    const book = await Book.findByIdAndUpdate(bookId);

    if (!book) {
      throw new ApiError(404, "Book not found");
    }
    if (book.availableCount === 0) {
      throw new ApiError(400, "Book not available for borrowing");
    }

    const transaction = await Transaction.create({
      book: bookId,
      user: req.user._id,
      borrowDate: new Date(),
      returnDate: null,
    });

    book.availableCount -= 1;
    await book.save();

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { book, transaction },
          "Book borrowed successfully"
        )
      );
  }
);

const returnBook = asyncHandler(
  async (req: verifiedRequest, res: Response, next: NextFunction) => {
    const { bookId } = req.params;
    if (!bookId) {
      throw new ApiError(400, "Book ID is required");
    }
    const book = await Book.findById(bookId);

    if (!book) {
      throw new ApiError(404, "Book not found");
    }

    const transaction = await Transaction.findOne({
      book: bookId,
      user: req.user._id,
      returnDate: null,
    });

    if (!transaction) {
      throw new ApiError(404, "No transaction found for the book");
    }

    transaction.returnDate = new Date();
    await transaction.save();

    book.availableCount += 1;
    await book.save();

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { book, transaction },
          "Book returned successfully"
        )
      );
  }
);

export { borrowBook, returnBook };
