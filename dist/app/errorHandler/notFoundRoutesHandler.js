"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        error: {
            path: req.originalUrl,
            method: req.method,
        },
    });
};
exports.notFoundHandler = notFoundHandler;
