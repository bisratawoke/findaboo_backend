import jwt from "jsonwebtoken";
import express from "express";
import HttpException, {
  HandleError,
  HttpErrorCode,
} from "../Exceptions/http.exception";

const SECRET = process.env.SECRET || "SECRET";
export async function createJwtTokenAndSendToUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const response = createAuthToken(req.body.userInfo);
    return res.json({ access_token: response });
  } catch (error) {
    next(error);
  }
}

export async function verifyUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const token = getAuthToken(req.headers);
    const userInfo = jwt.verify(token, SECRET);
    return res.json(userInfo);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      let httpError = new HttpException(
        "unauthenticated",
        HttpErrorCode.UNAUTHENTICATED
      );
      next(httpError);
    } else {
      next(error);
    }
  }
}

function createAuthToken(payload: Record<string, any>) {
  try {
    let token = jwt.sign(payload, SECRET);
    return token;
  } catch (error) {
    HandleError(error);
  }
}
function getAuthToken(headers: Record<string, any>) {
  try {
    let token = headers["authorization"].split(" ")[1];
    return token;
  } catch (error) {
    throw new HttpException("unauthenticated", HttpErrorCode.UNAUTHENTICATED);
  }
}
