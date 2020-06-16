import { LoginDto } from "./dto/login.dto";
import { LoginResponse } from "./types/login.response";
import * as jwt from "jsonwebtoken";
import { TokenEntity } from "../../entities/token.entity";
import * as moment from "moment";
import { injectable } from "inversify";

const secretJWT = "SomeSecretKey";
const expiresIn = 86400;

@injectable()
export class AuthService {
  constructor() {}

  async login(dto: LoginDto): Promise<LoginResponse> {
    const token = jwt.sign(dto, secretJWT, {
      expiresIn: expiresIn,
    });

    const expiresAt = moment().add(expiresIn, "seconds").toISOString();

    return {
      userId: "someId",
      role: "admin",
      status: "active",
      token: {
        jwt: token,
        expiresAt: expiresAt,
        expiresIn: expiresIn,
      } as TokenEntity,
    } as LoginResponse;
  }
}
