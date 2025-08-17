import express, { Request, Response } from "express";
import { Borrow } from "../model/borrow.model";

import { Book } from "../model/book.model";
import { createBorrowZodSchema } from "../Zod Validation/borrow.zodValidation";

export const borrowRoutes = express.Router();

// Borrow a book
borrowRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = await createBorrowZodSchema.parseAsync(req.body);

    const book = await Book.findById(body.book);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Save borrow record
    const borrowRecord = await Borrow.create(body);

    // Deduct book copies
    await Book.decreaseCopies(body.book, body.quantity);

    return res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

borrowRoutes.get("/", async (req, res) => {
  const borrowRecord = await Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "book",
      },
    },
    { $unwind: "$book" },
    {
      $project: {
        _id: 0,
        book: {
          title: "$book.title",
          isbn: "$book.isbn",
        },
        totalQuantity: 1,
      },
    },
  ]);
  return res.status(201).json({
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data: borrowRecord,
  });
});
