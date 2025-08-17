"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookZodSchema = exports.createBookZodSchema = exports.GenreEnum = void 0;
const zod_1 = require("zod");
exports.GenreEnum = zod_1.z.enum([
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
]);
exports.createBookZodSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    author: zod_1.z.string().min(1, "Author is required"),
    genre: exports.GenreEnum,
    isbn: zod_1.z.string().min(1, "ISBN is required"),
    description: zod_1.z
        .string()
        .max(1000, "Description can't be longer than 1000 characters")
        .optional(),
    copies: zod_1.z
        .number()
        .int("Copies must be an integer")
        .positive("Copies must be a positive number"),
    available: zod_1.z.boolean().optional(),
});
exports.updateBookZodSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required").optional(),
    author: zod_1.z.string().min(1, "Author is required").optional(),
    genre: exports.GenreEnum.optional(),
    isbn: zod_1.z.string().min(1, "ISBN is required").optional(),
    description: zod_1.z
        .string()
        .max(1000, "Description can't be longer than 1000 characters")
        .optional(),
    copies: zod_1.z
        .number()
        .int("Copies must be an integer")
        .positive("Copies must be a positive number")
        .optional(),
    available: zod_1.z.boolean().optional(),
});
