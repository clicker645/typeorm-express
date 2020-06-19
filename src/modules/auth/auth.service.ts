import { LoginDto } from "./dto/login.dto";
import { LoginResponse } from "./types/login.response";
import * as jwt from "jsonwebtoken";
import { Token } from "../../entities/token.entity";
import * as moment from "moment";
import { RedisService } from "../../infrastructure/database/redis/redis.service";
import { ITokenStorage } from "./inerfaces/token-storage.interface";
import { UserService } from "../user/user.service";
import { TokenDto } from "./dto/token.dto";
import { NotFoundError } from "ts-http-errors";
import * as bcrypt from "bcrypt";
import {
  BadRequestError,
  InternalServerError,
  MethodNotAllowedError,
} from "ts-http-errors/dist";
import { Inject, Injectable } from "@decorators/di";
import { IToken } from "./inerfaces/token.interface";
import { RegistrationDto } from "./dto/registration.dto";
import { plainToClass } from "class-transformer";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { JWT_EXPIRES_IN, SECRET_JWT } from "./passport/strategies/jwt.strategy";
import { Passport } from "./passport";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(RedisService) private readonly storage: ITokenStorage,
    private readonly passport: Passport
  ) {
    console.log("AuthService init");
  }

  async login(dto: LoginDto): Promise<LoginResponse> {
    const user = await this.userService.findOne({ email: dto.email });
    if (!user) {
      throw new NotFoundError("Error: user not found");
    }

    const passwordIsCompare = await bcrypt.compare(dto.password, user.password);
    if (!passwordIsCompare) {
      throw new MethodNotAllowedError("Error: incorrect password");
    }

    const tokenDto = new TokenDto().factoryByUser(user);
    const jwtToken = jwt.sign(tokenDto, SECRET_JWT, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const token = new Token();
    token.jwt = jwtToken;
    token.expiresAt = moment().add(JWT_EXPIRES_IN, "seconds").toISOString();
    token.expiresIn = JWT_EXPIRES_IN;

    try {
      await this.storage.set(user.id, token, JWT_EXPIRES_IN);
    } catch (e) {
      throw new InternalServerError(e);
    }

    return new LoginResponse().factory(user, token);
  }

  async logout(token: string): Promise<boolean> {
    const tokenData = jwt.verify(token, SECRET_JWT) as IToken;
    const ok = await this.storage.exist(tokenData.userId);
    if (!ok) {
      throw new BadRequestError("Error: JWT Token does not exit in storage");
    }
    return this.storage.delete(tokenData.userId);
  }

  async registration(dto: RegistrationDto): Promise<LoginResponse> {
    const userDto = plainToClass(CreateUserDto, dto);

    try {
      await this.userService.create(userDto);
    } catch (e) {
      throw new InternalServerError(e);
    }

    const loginDto = plainToClass(LoginDto, dto);
    return this.login(loginDto);
  }
}
