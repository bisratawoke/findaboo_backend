import express from "express";
import http from "node:http";
import { config } from "dotenv";
import HttpException from "./src/Exceptions/http.exception";
import authRouter from "./src/routers/auth.router";

config();
const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log("== in handler");
    if (err instanceof HttpException) {
      return res.status(err.code).json(err.message);
    } else {
      return res.status(500).json("Server error");
    }
  }
);
http
  .createServer(app)
  .listen(PORT, () => console.log(`Server listening on ${PORT}`));
