import { Request, Response } from "express";
import { postService } from "./post.service";

const createPosts = async (req: Request, res: Response) => {
  try {
    const result = await postService.createPostService(req.body);
    res.status(201).json({ result });
  } catch (error) {
    res.status(400).json({
      message: "Something  went wrong",
      details: error,
    });
  }
};

export const postController = {
  createPosts,
};
