import express, { Request, Response } from "express";

const app = express();

// middleware
app.use(express.json());

// api
app.get("/hello", (req: Request, res: Response) => {
  res.json({
    message: "Hello World",
  });
});

export default app;
