import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  console.error(err);

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
