import express, { Request, Response } from "express";
import { postRouter } from "./modules/post/post.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { commentRouter } from "./modules/comment/comment.router";

const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));
// app.all("/api/auth/*", toNodeHandler(auth));

// api
app.get("/hello", (req: Request, res: Response) => {
  res.json({
    message: "Hello World",
  });
});

// post router

app.use("/post", postRouter);

//comment router

app.use("/comment", commentRouter);

export default app;
