import mongoose, { Schema, Document } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface IBook extends Document {
  title: string;
  author: string;
  publicationYear: number;
  availableCount: number;
  availabilityStatus: boolean;
}

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    publicationYear: {
      type: Number,
      required: [true, "Publication year is required"],
    },
    availableCount: {
      type: Number,
      required: [true, "Available count is required"],
      default: 0,
    },
    availabilityStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.plugin(mongooseAggregatePaginate);

const Book = mongoose.model<IBook>("Book", bookSchema);

export default Book;
