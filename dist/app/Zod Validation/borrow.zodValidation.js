"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBorrowZodSchema = void 0;
// src/validations/borrow.validation.ts
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.createBorrowZodSchema = zod_1.z.object({
    book: zod_1.z
        .string()
        .nonempty("Book ID is required")
        .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: "Invalid book ID format",
    }),
    quantity: zod_1.z
        .number()
        .int("Quantity must be an integer")
        .min(1, "Quantity must be at least 1"),
    dueDate: zod_1.z
        .string()
        .nonempty("Due date is required")
        .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    })
        .transform((val) => new Date(val)),
});
