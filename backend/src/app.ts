// Global Imports
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

// Local Config
import notesRouter from "./routes/notes";

const app = express();

// Body parser
app.use(bodyParser.json());
app.use(morgan("dev"));

// Routes
app.use("/api/notes", notesRouter);

// No Route Found Handler
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found !"));
});

// Express Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  let errorMessage = "An unknown error occurred";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({
    error: errorMessage,
  });
});

export default app;
