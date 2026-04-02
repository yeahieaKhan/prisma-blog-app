import express, { NextFunction, Request, Response } from "express";
import { postController } from "./post.controller";

import { auth as betterAuth } from "../../lib/auth";

const router = express.Router();

// user role
export enum UserRoles {
  USER = "USER",
  ADMIN = "ADMIN",
}
// global user declear
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        emailVerified: boolean;
      };
    }
  }
}

// post router

const auth = (...roles: UserRoles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("User login successfully");

      const session = await betterAuth.api.getSession({
        headers: req.headers as any,
      });

      console.log(session);

      if (!session) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email Varification Requird! Please Varify your email!",
        });
      }

      // check user role

      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified,
      };

      if (roles.length && !roles.includes(req.user.role as UserRoles)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden access",
        });
      }

      next();
    } catch (error) {}
  };
};

router.get("/", postController.getAllPost);
router.post("/", auth(UserRoles.USER), postController.createPosts);

export const postRouter = router;
