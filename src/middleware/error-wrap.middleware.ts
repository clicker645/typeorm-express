import { Request, Response, NextFunction } from "express";

const errorWrapMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.status || 500);
  res.json({
    status: error.status,
    message: error.message
    //stack: error.stack
  });
};

export default errorWrapMiddleware;
