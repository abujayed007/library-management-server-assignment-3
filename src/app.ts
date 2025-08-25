import express, { Application, Request, Response } from "express";
import cors from "cors";
import { bookRoutes } from "./app/controller/book.controller";
import globalErrorHandler from "./app/errorHandler/globalErrorHandler";
import { notFoundHandler } from "./app/errorHandler/notFoundRoutesHandler";
import { borrowRoutes } from "./app/controller/borrow.controller";
import dotenv from "dotenv";

const app: Application = express();

dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: ["https://library-management-client-gules.vercel.app"],
  })
);

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to app");
});

app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;
