import express, { Request, Response } from "express";
import { commentController } from "./comment.controller";
import auth, { UserRoles } from "../../middleware/auth";

const router = express.Router();
router.post(
  "/",
  auth(UserRoles.USER, UserRoles.ADMIN),
  commentController.createComment,
);

export const commentRouter = router;
