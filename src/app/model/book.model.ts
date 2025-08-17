import mongoose, { Schema, Model } from "mongoose";
import { IBook } from "../interface/book.interface";

export interface BookModel extends Model<IBook> {
  decreaseCopies(bookId: string, quantity: number): Promise<IBook | null>;
  increaseCopies(bookId: string, quantity: number): Promise<IBook | null>;
}

const bookSchema: Schema = new Schema<IBook>(
  {
    title: { type: String, required: [true, "Title is required"] },
    author: { type: String, required: [true, "Author is required"] },
    genre: {
      type: String,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message: "Enum not valid. Got {VALUE}",
      },
      required: [true, "Genre is required"],
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: [true, "ISBN already exists"],
    },
    description: { type: String },
    copies: { type: Number, required: [true, "Copies is required"], min: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// decrease copies
bookSchema.statics.decreaseCopies = async function (
  bookId: string,
  quantity: number
) {
  const book = await this.findById(bookId);
  if (!book) {
    return "Book Not found";
  }
  if (book.copies < quantity) {
    throw new Error("Not enough copies available");
  }
  book.copies -= quantity;
  if (book.copies === 0) {
    book.available = false;
  }

  await book.save();
  return book;
};

// increase copies
bookSchema.statics.increaseCopies = async function (
  bookId: string,
  quantity: number
) {
  const book = await this.findById(bookId);
  if (!book) return null;

  book.copies += quantity;

  if (book.copies > 0) {
    book.available = true;
  }

  await book.save();
  return book;
};

export const Book = mongoose.model<IBook, BookModel>("Book", bookSchema);
