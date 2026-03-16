import express, { Request, Response } from "express";
import { postRouter } from "./modules/post/post.router";

const app = express();

// middleware
app.use(express.json());

// api
app.get("/hello", (req: Request, res: Response) => {
  res.json({
    message: "Hello World",
  });
});

// post router

app.use("/post", postRouter);

export default app;
