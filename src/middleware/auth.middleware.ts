import { NextFunction, Request, Response } from "express";
import * as passport from "passport";
import * as httpCode from "http-status-codes";

export const authMiddleware = (...userRole: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", { session: false }, (error, user) => {
      if (error) {
        res.status(httpCode.UNAUTHORIZED).json({ message: error });
        return;
      }

      if (userRole.length > 0 && !userRole.includes(user.role)) {
        res
          .status(httpCode.FORBIDDEN)
          .json({ message: "Error: you dont have access!" });
        return;
      }

      req.user = user;

      next();
    })(req, res, next);
  };
};
