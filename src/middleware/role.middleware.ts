import { Middleware } from "@decorators/express";
import { NextFunction, Response } from "express";
import * as statusCode from "http-status-codes";

class RoleMiddleware implements Middleware {
  private readonly _role: string;
  constructor(role: string) {
    this._role = role;
  }

  public use(request: any, response: Response, next: NextFunction): void {
    if (request.user.role != this._role) {
      response
        .status(statusCode.FORBIDDEN)
        .json({ message: "Error: you dont have permissions!" });
      return;
    }

    next();
  }
}

export const roleMiddleware = (role: string) => {
  return RoleMiddleware.bind(null, role);
};
