import express, { Application, Request, Response } from "express";
import cors from "cors";
import { bookRoutes } from "./app/controller/book.controller";
import globalErrorHandler from "./app/errorHandler/globalErrorHandler";
import { notFoundHandler } from "./app/errorHandler/notFoundRoutesHandler";
import { borrowRoutes } from "./app/controller/borrow.controller";

const app: Application = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to app");
});

app.listen(PORT, () => {
  console.log(`Server is running  ${PORT}`);
});

app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;
