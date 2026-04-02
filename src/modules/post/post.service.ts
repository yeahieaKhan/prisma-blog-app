import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { Post } from "../../../generated/prisma/client";

// get all post api

const getAllPost = async (payload: { search: string | undefined }) => {
  const result = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },

    where: {
      OR: [
        {
          title: {
            contains: payload.search as string,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: payload.search as string,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: payload.search as string,
          },
        },
      ],
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
