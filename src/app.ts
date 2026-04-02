import express, { Request, Response } from "express";
import { postRouter } from "./modules/post/post.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";

const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:8080 ",
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

// api
app.get("/hello", (req: Request, res: Response) => {
  res.json({
    message: "Hello World",
  });
});

// post router

app.use("/post", postRouter);

export default app;
