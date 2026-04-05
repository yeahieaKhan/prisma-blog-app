import { Request, Response } from "express";
import { commentService } from "./comment.service";

const createComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    req.body.authorId = user?.id;
    const result = await commentService.createComments(req.body);

    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({
      message: "Something went wrong",
      details: error.message,
    });
  }
};

export const commentController = {
  createComment,
};
