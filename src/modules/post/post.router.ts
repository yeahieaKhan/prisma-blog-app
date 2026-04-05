import express, { NextFunction, Request, Response } from "express";
import { postController } from "./post.controller";

import { auth as betterAuth } from "../../lib/auth";
import auth, { UserRoles } from "../../middleware/auth";

const router = express.Router();

// user role

router.get("/", postController.getAllPost);
router.post("/", auth(UserRoles.USER), postController.createPosts);

export const postRouter = router;

/// sohag hossain done this
