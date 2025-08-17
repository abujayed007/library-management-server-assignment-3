import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    error: {
      path: req.originalUrl,
      method: req.method,
    },
  });
};
