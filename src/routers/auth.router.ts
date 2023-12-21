import express from "express";
import { authRegisterDto } from "../dto/auth.register.dto";
import validate from "../middlewares/validate.middlewares";
import { register, signin } from "../controllers/auth.controller";
import {
  createJwtTokenAndSendToUser,
  verifyUser,
} from "../middlewares/jwt.middleware";
const authRouter = express.Router();

authRouter.post("/register", authRegisterDto(), validate, register);
authRouter.post(
  "/signin",
  authRegisterDto(),
  validate,
  signin,
  createJwtTokenAndSendToUser
);

authRouter.get("/verify", verifyUser);

export default authRouter;
