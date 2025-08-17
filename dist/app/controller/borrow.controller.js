"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../model/borrow.model");
const book_model_1 = require("../model/book.model");
const borrow_zodValidation_1 = require("../Zod Validation/borrow.zodValidation");
exports.borrowRoutes = express_1.default.Router();
// Borrow a book
exports.borrowRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield borrow_zodValidation_1.createBorrowZodSchema.parseAsync(req.body);
        const book = yield book_model_1.Book.findById(body.book);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        // Save borrow record
        const borrowRecord = yield borrow_model_1.Borrow.create(body);
        // Deduct book copies
        yield book_model_1.Book.decreaseCopies(body.book, body.quantity);
        return res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowRecord,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}));
exports.borrowRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const borrowRecord = yield borrow_model_1.Borrow.aggregate([
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
}));
