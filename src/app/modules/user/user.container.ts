import { Container, interfaces } from "inversify";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import {
  ControllerType,
  IController,
} from "../../interfaces/controller.interface";

export let userContainer = new Container() as interfaces.Container;

userContainer.bind(UserService).to(UserService).inSingletonScope();
userContainer
  .bind<IController>(ControllerType)
  .to(UserController)
  .inSingletonScope();
