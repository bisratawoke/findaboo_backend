import { validationResult } from "express-validator";
import express from "express";
import HttpException, { HttpErrorCode } from "../Exceptions/http.exception";
export default function validate(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const result = validationResult(req);
    if (!result.isEmpty())
      throw new HttpException(
        JSON.stringify(result.array()),
        HttpErrorCode.BAD_REQUEST
      );
    next();
  } catch (error) {
    next(error);
  }
}
