import { inject, injectable } from "inversify";
import { IController } from "../../interfaces/controller.interface";
import * as express from "express";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import * as statusCode from "http-status-codes";
import validationMiddleware from "../../middleware/validation.middleware";
import * as asyncHandler from "express-async-handler";
import { QueryUserDto } from "./dto/query-user.dto";
import { plainToClass } from "class-transformer";
import { PaginationOptions } from "../../infrastructure/database/sql/pagination/pagination.dto";

@injectable()
export class UserController implements IController {
  prefix: string = "/user";
  public router = express.Router();

  constructor(@inject(UserService) private readonly userService: UserService) {
    this.initRoutes();
  }

  findBy = async (req: Request, res: Response) => {
    const query = plainToClass(QueryUserDto, req.query);
    const pagination = plainToClass(PaginationOptions, req.query);

    const response = await this.userService.findBy(query, pagination);

    res.json(response);
  };

  create = async (req: Request, res: Response) => {
    const userDto = req.body as CreateUserDto;
    let response = null;
    try {
      response = await this.userService.create(userDto);
    } catch (e) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json(e);
      return;
    }

    res.json(response);
  };

  initRoutes() {
    this.router.post(
      "/",
      validationMiddleware(CreateUserDto),
      asyncHandler(this.create)
    );
    this.router.get("/", asyncHandler(this.findBy));
  }
}
