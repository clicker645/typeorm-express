import { IController } from "../../interfaces/controller.interface";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import * as statusCode from "http-status-codes";
import { plainToClass } from "class-transformer";
import { PaginationOptions } from "../../infrastructure/database/sql/pagination/pagination.dto";
import { Controller, Get, Post } from "@decorators/express";
import { Injectable } from "@decorators/di";

@Controller("/user")
@Injectable()
export class UserController implements IController {
  constructor(private readonly userService: UserService) {
    console.log("UserController init");
  }

  @Get("/")
  async findBy(req: Request, res: Response) {
    const pagination = plainToClass(PaginationOptions, req.query);
    const response = await this.userService.find(req.query, pagination);

    res.json(response);
  }

  @Post("/")
  async create(req: Request, res: Response) {
    const userDto = req.body as CreateUserDto;
    let response = null;
    try {
      response = await this.userService.create(userDto);
    } catch (e) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json(e);
      return;
    }

    res.json(response);
  }
}
