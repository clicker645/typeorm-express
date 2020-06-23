import { inject, injectable } from "inversify";
import * as jwt from "jsonwebtoken";
import * as moment from "moment";
import * as bcrypt from "bcrypt";
import {
  MethodNotAllowedError,
  InternalServerError,
  BadRequestError,
  NotFoundError,
} from "ts-http-errors";
import { plainToClass } from "class-transformer";

import { LoginDto } from "./dto/login.dto";
import { RegistrationDto } from "./dto/registration.dto";
import { TokenDto } from "./dto/token.dto";
import { LoginResponse } from "./types/login.response";
import { Token } from "../../../entities/token.entity";
import { ITokenStorage } from "./inerfaces/token-storage.interface";
import { UserService } from "../user/user.service";
import { IToken } from "./inerfaces/token.interface";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { RedisService } from "../../../infrastructure/database/redis/redis.service";
import { Passport } from "./passport";
import { Config } from "../../../config/config";

@injectable()
export class AuthService {
  constructor(
    @inject(UserService) private readonly userService: UserService,
    @inject(RedisService) private readonly storage: ITokenStorage,
    @inject(Passport) private readonly passport: Passport,
    @inject(Config) private readonly config: Config
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
    const jwtToken = jwt.sign(tokenDto, this.config.jwt.secret, {
      expiresIn: this.config.jwt.expiresIn,
    });

    const token = new Token();
    token.jwt = jwtToken;
    token.expiresAt = moment()
      .add(this.config.jwt.expiresIn, "seconds")
      .toISOString();
    token.expiresIn = this.config.jwt.expiresIn;

    try {
      await this.storage.set(user.id, token, this.config.jwt.expiresIn);
    } catch (e) {
      throw new InternalServerError(e);
    }

    return new LoginResponse().factory(user, token);
  }

  async logout(token: string): Promise<boolean> {
    const tokenData = jwt.verify(token, this.config.jwt.secret) as IToken;
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
