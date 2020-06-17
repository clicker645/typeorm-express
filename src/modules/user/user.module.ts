import { Container, interfaces } from "inversify";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { sqlModule } from "../../infrastructure/database/sql/database.module";

let userModule = new Container() as interfaces.Container;
userModule = Container.merge(userModule, sqlModule);

userModule.bind(UserService).to(UserService);
userModule.bind(UserController).to(UserController);

export { userModule };
