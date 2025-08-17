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
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/books", book_controller_1.bookRoutes);
app.use("/api/borrow", borrow_controller_1.borrowRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to app");
});
app.listen(PORT, () => {
    console.log(`Server is running  ${PORT}`);
});
app.use(globalErrorHandler_1.default);
app.use(notFoundRoutesHandler_1.notFoundHandler);
exports.default = app;
