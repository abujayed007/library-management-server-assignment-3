import { z } from "zod";

export const GenreEnum = z.enum([
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
]);

export const createBookZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: GenreEnum,
  isbn: z.string().min(1, "ISBN is required"),
  description: z
    .string()
    .max(1000, "Description can't be longer than 1000 characters")
    .optional(),
  copies: z
    .number()
    .int("Copies must be an integer")
    .positive("Copies must be a positive number"),
  available: z.boolean().optional(),
});

export const updateBookZodSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  author: z.string().min(1, "Author is required").optional(),
  genre: GenreEnum.optional(),
  isbn: z.string().min(1, "ISBN is required").optional(),
  description: z
    .string()
    .max(1000, "Description can't be longer than 1000 characters")
    .optional(),
  copies: z
    .number()
    .int("Copies must be an integer")
    .positive("Copies must be a positive number")
    .optional(),
  available: z.boolean().optional(),
});
