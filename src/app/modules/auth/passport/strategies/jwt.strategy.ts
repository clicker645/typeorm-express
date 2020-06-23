import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { inject, injectable } from "inversify";

import { IToken } from "../../inerfaces/token.interface";
import { ITokenStorage } from "../../inerfaces/token-storage.interface";
import { RedisService } from "../../../../../infrastructure/database/redis/redis.service";
import { Config } from "../../../../../config/config";

@injectable()
export class JwtStrategy {
  private readonly _strategy: Strategy;
  constructor(
    @inject(RedisService) private readonly storage: ITokenStorage,
    @inject(Config) private readonly config: Config
  ) {
    console.log("JwtStrategy init");

    this._strategy = new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.config.jwt.secret,
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
