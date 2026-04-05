import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { Post } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";

// get all post api

const getAllPost = async ({
  search,
  tags,
  page,
  limit,
  skip,
}: {
  search: string | undefined;
  tags: string[] | [];
  page: number;
  limit: number;
  skip: number;
}) => {
  const andCondition: PostWhereInput[] = [];
  if (search) {
    andCondition.push({
      OR: [
        {
          title: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: search as string,
          },
        },
      ],
    });
  }

  if (tags.length > 0) {
    andCondition.push({
      tags: {
        hasEvery: tags as string[],
      },
    });
  }

  const result = await prisma.post.findMany({
    take: limit,
    skip,
    orderBy: {
      createdAt: "desc",
    },

    where: {
      AND: andCondition,
    },
  });
  return result;
};

// getpost by id

const getPostById = async (id: string) => {
  const result = await prisma.post.findUnique({
    where: {
      id: id,
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
  getPostById,
};

// some file added
