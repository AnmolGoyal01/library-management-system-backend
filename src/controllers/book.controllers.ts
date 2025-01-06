import { Request, Response, NextFunction } from "express";
import { asyncHandler, ApiResponse, ApiError } from "../utils";
import Book from "../models/book.model";

const getAvailableBooks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const books = await Book.find({ availableCount: { $gt: 0 } })
      .skip(skip)
      .limit(limit);

    const totalBooks = await Book.countDocuments({
      availableCount: { $gt: 0 },
    });
    const totalPages = Math.ceil(totalBooks / limit);

    res.status(200).json(
      new ApiResponse(
        200,
        {
          books,
          totalPages,
          currentPage: page,
          totalBooks,
        },
        "Books fetched successfully"
      )
    );
  }
);

const getBookById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    if (!bookId) {
      throw new ApiError(400, "Book ID is required");
    }
    const book = await Book.findById(bookId);
    if (!book) {
      throw new ApiError(404, "Book not found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, book, "Book fetched successfully"));
  }
);

const addBook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, author, publicationYear, availableCount } = req.body;
    if (
      [title, author, publicationYear, availableCount].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }
    const alreadyExists = await Book.findOne({
      $and: [{ title }, { author }, { publicationYear }],
    });
    if (alreadyExists) {
      throw new ApiError(400, "Book already exists");
    }
    const newBook = new Book({
      title,
      author,
      publicationYear,
      availableCount,
    });
    await newBook.save();
    res
      .status(201)
      .json(new ApiResponse(201, newBook, "Book added successfully"));
  }
);

const updateBook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    if (!bookId) {
      throw new ApiError(400, "Book ID is required");
    }
    const { title, author, publicationYear, availableCount } = req.body;
    if (
      [title, author, publicationYear, availableCount].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }
    const book = await Book.findById(bookId);
    if (!book) {
      throw new ApiError(404, "Book not found");
    }
    book.title = title;
    book.author = author;
    book.publicationYear = publicationYear;
    book.availableCount = availableCount;
    await book.save();
    res
      .status(200)
      .json(new ApiResponse(200, book, "Book updated successfully"));
  }
);

const deleteBook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    if (!bookId) {
      throw new ApiError(400, "Book ID is required");
    }
    const book = await Book.findByIdAndDelete(bookId);
    if (!book) {
      throw new ApiError(404, "Book not found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, [], "Book deleted successfully"));
  }
);

export { getAvailableBooks, getBookById, addBook, updateBook, deleteBook };
