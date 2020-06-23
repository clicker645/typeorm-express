import { NextFunction, Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import * as httpCode from "http-status-codes";

export const bodyReadMiddleware = (dto) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let dtoObject = null;
    try {
      dtoObject = plainToClass(dto, req.body);
    } catch (e) {
      res.status(httpCode.INTERNAL_SERVER_ERROR).json(e);
      return;
    }

    const err = await validate(dtoObject);

    if (err.length > 0) {
      res
        .status(httpCode.UNPROCESSABLE_ENTITY)
        .json({ message: err.toString() });
      return;
    }

    req.body = dtoObject;
    next();
  };
};
