import { Container, interfaces } from "inversify";
import "reflect-metadata";
import { AuthService } from "./auth.service";
import AuthController from "./auth.controller";
import { redisModule } from "../../infrastructure/database/redis/redis.module";
import { ITokenStorage } from "./inerfaces/token-storage.interface";
import { RedisService } from "../../infrastructure/database/redis/redis.service";
import { userModule } from "../user/user.module";

let authModule = new Container() as interfaces.Container;
authModule = Container.merge(authModule, userModule);
authModule = Container.merge(authModule, redisModule);

authModule.bind(AuthService).to(AuthService);
authModule.bind(AuthController).to(AuthController);

redisModule.bind<ITokenStorage>(RedisService).to(RedisService);

export { authModule };
