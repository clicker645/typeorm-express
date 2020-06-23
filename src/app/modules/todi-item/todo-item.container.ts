import { Container } from "inversify";

import TodoItemController from "./todo-item.controller";
import { ControllerType } from "../../interfaces/controller.interface";
import TodoItemService from "./todo-item.service";

export const todoItemContainer = new Container();

todoItemContainer.bind(TodoItemService).to(TodoItemService).inSingletonScope();
todoItemContainer
  .bind(ControllerType)
  .to(TodoItemController)
  .inSingletonScope();
