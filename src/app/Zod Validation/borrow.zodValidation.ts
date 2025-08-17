// src/validations/borrow.validation.ts
import { z } from "zod";
import mongoose from "mongoose";

export const createBorrowZodSchema = z.object({
  book: z
    .string()
    .nonempty("Book ID is required")
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid book ID format",
    }),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1"),
  dueDate: z
    .string()
    .nonempty("Due date is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .transform((val) => new Date(val)),
});
