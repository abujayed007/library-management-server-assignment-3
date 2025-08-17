import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";
  let errorData: any = err;

  /**
   * Handle Mongoose ValidationError
   */
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Validation failed";

    const formattedErrors: Record<string, any> = {};
    Object.values(err.errors).forEach((e: any) => {
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
  } else if (err instanceof ZodError) {
    /**
     * Handle Zod ValidationError
     */
    statusCode = 400;
    message = "Validation failed";

    const formattedErrors: Record<string, any> = {};
    err.issues.forEach((issue) => {
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
        value: (issue as any).value ?? null,
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

export default globalErrorHandler;
