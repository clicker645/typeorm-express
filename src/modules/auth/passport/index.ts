import * as passport from "passport";
import { Container, Inject, Injectable } from "@decorators/di";
import { JWT_STRATEGY, JwtStrategy } from "./strategies/jwt.strategy";
import { RedisService } from "../../../infrastructure/database/redis/redis.service";

@Injectable()
export class Passport {
  constructor(
    @Inject(JWT_STRATEGY) private readonly strategy: passport.Strategy
  ) {
    console.log("Passport init");
    passport.use(strategy);
  }
}

Container.provide([
  {
    provide: Passport,
    useFactory: (strategy) => {
      new Passport(strategy);
    },
    deps: [JWT_STRATEGY],
  },
]);
