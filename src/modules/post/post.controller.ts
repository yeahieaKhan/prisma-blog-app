import { Request, Response } from "express";
import { postService } from "./post.service";
import { success } from "better-auth/*";

const getAllPost = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const searchTitle = typeof search === "string" ? search : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const skip = (page - 1) * limit;

    const result = await postService.getAllPost({
      search: searchTitle,
      tags,
      page,
      limit,
      skip,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: "Something  went wrong",
      details: error.message,
    });
  }
};

const createPosts = async (req: Request, res: Response) => {
  console.log(req.user);

  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unathories",
      });
    }
    const result = await postService.createPostService(
      req.body,
      user.id as string,
    );

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
  getAllPost,
};
