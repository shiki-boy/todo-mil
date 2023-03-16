import { NextFunction, Request, Response } from "express";
import { HttpException } from "@exceptions/HttpException";
import { logger } from "@utils/logger";

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = res.statusCode || 500;
    const message: string =
      status === 422
        ? JSON.parse(error.message)
        : error.message || "Something went wrong";

    logger.error(
      `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`
    );
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
