import { LoginDto } from "./dto/login.dto";
import { LoginResponse } from "./types/login.response";
import * as jwt from "jsonwebtoken";
import { Token } from "../../entities/token.entity";
import * as moment from "moment";
import { inject, injectable } from "inversify";
import { SqlDatabase } from "../../infrastructure/database/sql/sql.connection";
import { RedisService } from "../../infrastructure/database/redis/redis.service";
import { ITokenStorage } from "./inerfaces/token-storage.interface";
import { UserService } from "../user/user.service";

const secretJWT = "SomeSecretKey";
const expiresIn = 86400;

@injectable()
export class AuthService {
  constructor(
    @inject(UserService) private readonly userService: UserService,
    @inject(RedisService) private readonly storage: ITokenStorage
  ) {}

  async login(dto: LoginDto): Promise<LoginResponse> {
    const jwtToken = jwt.sign(dto, secretJWT, {
      expiresIn: expiresIn,
    });

    const token = new Token();
    token.jwt = jwtToken;
    token.expiresAt = moment().add(expiresIn, "seconds").toISOString();
    token.expiresIn = expiresIn;

    let ok = null;
    try {
      ok = await this.storage.set("someId", token, expiresIn);
    } catch (e) {
      throw new Error(e);
    }

    if (ok) {
      return {
        userId: "someId",
        role: "admin",
        status: "active",
        token: token,
      } as LoginResponse;
    }
  }
}
