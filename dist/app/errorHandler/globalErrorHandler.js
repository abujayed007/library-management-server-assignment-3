"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";
    let errorData = err;
    /**
     * Handle Mongoose ValidationError
     */
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        statusCode = 400;
        message = "Validation failed";
        const formattedErrors = {};
        Object.values(err.errors).forEach((e) => {
            formattedErrors[e.path] = {
                message: e.message,
                name: "ValidatorError",
                properties: e.properties,
                kind: e.kind,
                path: e.path,
                value: e.value,
            };
        });
        errorData = {
            name: "ValidationError",
            errors: formattedErrors,
        };
    }
    else if (err instanceof zod_1.ZodError) {
        /**
         * Handle Zod ValidationError
         */
        statusCode = 400;
        message = "Validation failed";
        const formattedErrors = {};
        err.issues.forEach((issue) => {
            var _a;
            const field = issue.path.join(".");
            formattedErrors[field] = {
                message: issue.message,
                name: "ValidatorError",
                properties: {
                    message: issue.message,
                    type: issue.code,
                },
                kind: issue.code,
                path: field,
                value: (_a = issue.value) !== null && _a !== void 0 ? _a : null,
            };
        });
        errorData = {
            name: "ValidationError",
            errors: formattedErrors,
        };
    }
    /**
     * Send Response
     */
    res.status(statusCode).json({
        message,
        success: false,
        error: errorData,
    });
};
exports.default = globalErrorHandler;
