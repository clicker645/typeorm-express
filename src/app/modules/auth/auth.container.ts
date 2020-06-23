import { Container } from "inversify";
import { interfaces } from "inversify/dts/interfaces/interfaces";

import AuthController from "./auth.controller";
import { AuthService } from "./auth.service";
import {
  ControllerType,
  IController,
} from "../../interfaces/controller.interface";
import { passportContainer } from "./passport/passport.container";

export let authContainer = new Container() as interfaces.Container;
authContainer = Container.merge(authContainer, passportContainer);

authContainer.bind(AuthService).to(AuthService).inSingletonScope();
authContainer
  .bind<IController>(ControllerType)
  .to(AuthController)
  .inSingletonScope();
