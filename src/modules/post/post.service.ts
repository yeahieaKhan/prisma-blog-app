import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { Post } from "../../../generated/prisma/client";

// get all post api

const getAllPost = async () => {
  const result = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};
// create post

const createPostService = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string,
) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId: userId,
    },
  });
  return result;
};

export const postService = {
  createPostService,
  getAllPost,
};
