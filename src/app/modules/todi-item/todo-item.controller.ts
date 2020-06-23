import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as asyncHandler from "express-async-handler";

import { IController } from "../../interfaces/controller.interface";
import TodoItemService from "./todo-item.service";
import { bodyReadMiddleware } from "../../../middleware/body-read.middleware";
import { CreateTodoItemDto } from "./dto/create.todo-item.dto";
import { authMiddleware } from "../../../middleware/auth.middleware";
import { getPaginationFromRequest } from "../../../infrastructure/database/sql/pagination/pagination.utils";

@injectable()
class TodoItemController implements IController {
  prefix = "/todo-item";
  router = Router();

  constructor(
    @inject(TodoItemService) private readonly todoItemService: TodoItemService
  ) {
    console.log("TodoItemController init");
    this.initRoutes();
  }

  find = async (req: Request, res: Response) => {
    const pagination = getPaginationFromRequest(req);
    const user = req.user as { id: string };

    const response = await this.todoItemService.find(
      user.id,
      req.query,
      pagination
    );

    res.json(response);
  };

  create = async (req: Request, res: Response) => {
    const response = await this.todoItemService.create(req.body);

    res.json(response);
  };

  initRoutes() {
    this.router.post(
      "/",
      authMiddleware(),
      bodyReadMiddleware(CreateTodoItemDto),
      asyncHandler(this.create)
    );
    this.router.get("/", authMiddleware("admin"), asyncHandler(this.find));
  }
}

export default TodoItemController;
