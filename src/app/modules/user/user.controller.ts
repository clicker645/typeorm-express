import { inject, injectable } from "inversify";
import { Request, Response, Router } from "express";
import * as asyncHandler from "express-async-handler";

import { IController } from "../../interfaces/controller.interface";
import { UserService } from "./user.service";
import { bodyReadMiddleware } from "../../../middleware/body-read.middleware";
import { CreateUserDto } from "./dto/create-user.dto";
import { getPaginationFromRequest } from "../../../infrastructure/database/sql/pagination/pagination.utils";

@injectable()
export class UserController implements IController {
  prefix: string = "/user";
  router: Router = Router();

  constructor(@inject(UserService) private readonly userService: UserService) {
    console.log("UserController init");
    this.initRoutes();
  }

  findBy = async (req: Request, res: Response) => {
    const pagination = getPaginationFromRequest(req);
    const response = await this.userService.find(req.query, pagination);

    res.json(response);
  };

  create = async (req: Request, res: Response) => {
    const response = await this.userService.create(req.body);

    res.json(response);
  };

  initRoutes() {
    this.router.get("/", asyncHandler(this.findBy));
    this.router.post(
      "/",
      bodyReadMiddleware(CreateUserDto),
      asyncHandler(this.create)
    );
  }
}
