import { NextFunction, Request, Response } from "express";

declare type MiddlewareType = (
  req: Request,
  resp: Response,
  next: NextFunction
) => void;

export default MiddlewareType;
