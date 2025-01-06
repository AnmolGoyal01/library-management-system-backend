import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  book: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  borrowDate: Date;
  returnDate: Date | null;
}

const transactionSchema = new Schema<ITransaction>(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);

export default Transaction;
