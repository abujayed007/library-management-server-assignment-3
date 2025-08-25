"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_controller_1 = require("./app/controller/book.controller");
const globalErrorHandler_1 = __importDefault(require("./app/errorHandler/globalErrorHandler"));
const notFoundRoutesHandler_1 = require("./app/errorHandler/notFoundRoutesHandler");
const borrow_controller_1 = require("./app/controller/borrow.controller");
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["https://library-management-client-gules.vercel.app"],
}));
app.use("/api/books", book_controller_1.bookRoutes);
app.use("/api/borrow", borrow_controller_1.borrowRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to app");
});
app.use(globalErrorHandler_1.default);
app.use(notFoundRoutesHandler_1.notFoundHandler);
exports.default = app;
