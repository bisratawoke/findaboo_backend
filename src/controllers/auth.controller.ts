import express from "express";
import { create, find } from "../services/auth.service";

export async function register(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    await create(req.body);
    return res.status(201).json("Successfully registered");
  } catch (error: any) {
    next(error);
  }
}

export async function signin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const response = await find(req.body);
    req.body.userInfo = response;
    next();
  } catch (error: any) {
    next(error);
  }
}
