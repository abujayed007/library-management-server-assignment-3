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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../model/book.model");
const book_zodValidation_1 = require("../Zod Validation/book.zodValidation");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield book_zodValidation_1.createBookZodSchema.parseAsync(req.body);
    const book = yield book_model_1.Book.create(body);
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book,
    });
}));
exports.bookRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { genre } = req.query;
    const filter = genre ? { genre } : {};
    const result = yield book_model_1.Book.find(filter).sort({ copies: "desc" }).limit(10);
    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        data: result,
    });
}));
exports.bookRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const result = yield book_model_1.Book.findById(bookId);
    res.status(201).json({
        success: true,
        message: "Book retrieved successfully",
        data: result,
    });
}));
exports.bookRoutes.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield book_zodValidation_1.updateBookZodSchema.parseAsync(req.body);
    const bookId = req.params.bookId;
    const options = { new: true, runValidators: true };
    const book = yield book_model_1.Book.findById(bookId);
    yield book_model_1.Book.increaseCopies(bookId, typeof body.copies === "number" ? body.copies : 0);
    const result = yield book_model_1.Book.findByIdAndUpdate(bookId, { $set: body }, options);
    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data: result,
    });
}));
exports.bookRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    yield book_model_1.Book.findByIdAndDelete(bookId);
    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
    });
}));
