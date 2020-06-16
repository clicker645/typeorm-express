import { Request, Response, NextFunction } from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.json(res);
  console.log("Request logged:", res.statusCode, req.method, req.path);
  next();
};

export default loggerMiddleware;
