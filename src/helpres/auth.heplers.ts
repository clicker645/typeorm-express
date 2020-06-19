import { Request } from "express";
import { BadRequestError, UnauthorizedError } from "ts-http-errors/dist";
import trimPrefix from "../common/trim-prefix";
const BEARER_PREFIX = "Bearer ";

const readToken = (req: Request): string => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    throw new UnauthorizedError("Error: Authorization token does not exist!");
  }

  const token = trimPrefix(bearerToken, BEARER_PREFIX);
  if (token === bearerToken) {
    throw new BadRequestError("Error: token is not Bearer JWT format!");
  }

  return token;
};

export default readToken;
