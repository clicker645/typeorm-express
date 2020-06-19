import { NextFunction, Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import * as statusCode from "http-status-codes";
import { Middleware } from "@decorators/express";

export const validationMiddleware = (objectClass) => {
  return class Validator implements Middleware {
    use(req: Request, res: Response, next: NextFunction) {
      const objectForValidation = plainToClass(objectClass, req.body);

      let err = null;
      try {
        err = validate(objectForValidation);
      } catch (e) {
        throw new Error(e);
      }

      err.length > 0
        ? res.status(statusCode.UNPROCESSABLE_ENTITY).json({ message: err })
        : next();
    }
  };
};
