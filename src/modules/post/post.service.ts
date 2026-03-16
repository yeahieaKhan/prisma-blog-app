import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { Post } from "../../../generated/prisma/client";

const createPostService = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt">,
) => {
  const result = await prisma.post.create({ data });
  return result;
};

export const postService = {
  createPostService,
};
