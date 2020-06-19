import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { RedisService } from "../../infrastructure/database/redis/redis.service";
import { Container } from "@decorators/di";
import { Passport } from "./passport";

Container.provide([
  {
    provide: AuthService,
    useFactory: (userService, redisService, passport) => {
      new AuthService(userService, redisService, passport);
    },
    deps: [UserService, RedisService, Passport],
  },
]);
