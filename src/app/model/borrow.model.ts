import { Schema, model } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
