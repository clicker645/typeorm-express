import { PaginationOptions } from "./pagination.dto";
import { plainToClass } from "class-transformer";
import { Request } from "express";

export const getPaginationFromRequest = (req: Request): PaginationOptions => {
  return plainToClass(PaginationOptions, req.query);
};
