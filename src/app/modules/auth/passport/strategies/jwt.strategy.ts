import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { Container, Inject, Injectable } from "@decorators/di";
import { IToken } from "../../inerfaces/token.interface";
import { ITokenStorage } from "../../inerfaces/token-storage.interface";
import { RedisService } from "../../../../infrastructure/database/redis/redis.service";

export const JWT_STRATEGY = "JWT_STRATEGY";
export const SECRET_JWT = "SomeSecretJwt";
export const JWT_EXPIRES_IN = 86000;

@Injectable()
export class JwtStrategy {
  private readonly _strategy: Strategy;
  constructor(@Inject(RedisService) private readonly storage: ITokenStorage) {
    console.log("JwtStrategy init");
    this._strategy = new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET_JWT,
      },
      (payload: IToken, done: VerifiedCallback) => {
        let err = null;
        const ok = this.tokenNotExpired(payload);
        if (!ok) {
          err = "Token expired";
        }

        done(err, payload);
      }
    );
  }

  get strategy() {
    return this._strategy;
  }

  tokenNotExpired(token: IToken): Promise<boolean> {
    return this.storage.exist(token.userId);
  }
}

Container.provide([
  {
    provide: JWT_STRATEGY,
    useFactory: (redis) => {
      return new JwtStrategy(redis).strategy;
    },
    deps: [RedisService],
  },
]);
