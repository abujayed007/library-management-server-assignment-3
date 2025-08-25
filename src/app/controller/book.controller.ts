import express, { Request, Response } from "express";
import { Book } from "../model/book.model";
import {
  createBookZodSchema,
  updateBookZodSchema,
} from "../Zod Validation/book.zodValidation";

export const bookRoutes = express.Router();

bookRoutes.post("/", async (req: Request, res: Response) => {
  const body = await createBookZodSchema.parseAsync(req.body);
  const book = await Book.create(body);
  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book,
  });
});

bookRoutes.get("/", async (req: Request, res: Response) => {
  const { genre } = req.query;
  const filter = genre ? { genre } : {};
  const result = await Book.find(filter).sort({ copies: "desc" }).limit(10);
  res.status(201).json({
    success: true,
    message: "Books retrieved successfully",
    data: result,
  });
});

bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const result = await Book.findById(bookId);
  res.status(201).json({
    success: true,
    message: "Book retrieved successfully",
    data: result,
  });
});

bookRoutes.put("/:bookId", async (req: Request, res: Response) => {
  const body = await updateBookZodSchema.parseAsync(req.body);
  const bookId = req.params.bookId;
  const options = { new: true, runValidators: true };
  const book = await Book.findById(bookId);

  await Book.increaseCopies(
    bookId,
    typeof body.copies === "number" ? body.copies : 0
  );

  const result = await Book.findByIdAndUpdate(bookId, { $set: body }, options);

  res.status(201).json({
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});

bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  await Book.findByIdAndDelete(bookId);
  res.status(201).json({
    success: true,
    message: "Book deleted successfully",
    data: null,
  });
});
