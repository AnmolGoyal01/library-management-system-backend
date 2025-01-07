import { Request, Response, NextFunction } from "express";
import { asyncHandler, ApiResponse, ApiError } from "../utils";
import Book from "../models/book.model";
import Transaction from "../models/transaction.model";

const getDashBoard = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Step 1: Calculate total available books
    const totalAvailableBooks = await Book.aggregate([
      {
        $group: {
          _id: null,
          totalAvailable: { $sum: "$availableCount" },
        },
      },
    ]);
    const availableBooksCount = totalAvailableBooks[0]?.totalAvailable || 0;

    // Step 2: Calculate borrowed books
    const borrowedBooksCount = await Transaction.countDocuments({
      returnDate: null,
    });

    // Step 3: Calculate total books (available + borrowed)
    const totalBooksCount = availableBooksCount + borrowedBooksCount;

    // Step 4: Send response
    res.status(200).json(
      new ApiResponse(
        200,
        {
          totalBooks: totalBooksCount,
          totalAvailableBooks: availableBooksCount,
          borrowedBooks: borrowedBooksCount,
        },
        "Book statistics fetched successfully"
      )
    );
  }
);

export { getDashBoard };
