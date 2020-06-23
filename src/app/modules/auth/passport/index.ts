import * as passport from "passport";
import { inject, injectable } from "inversify";
import { JwtStrategy } from "./strategies/jwt.strategy";

@injectable()
export class Passport {
  constructor(
    @inject(JwtStrategy)
    private readonly strategyFactory: () => passport.Strategy
  ) {
    console.log("Passport init");
    passport.use(strategyFactory());
  }
}
