import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { Controller, Post, Response, Body, Request } from "@decorators/express";
import { IController } from "../../interfaces/controller.interface";
import { Injectable } from "@decorators/di";
import readToken from "../../helpres/auth.heplers";
import * as statusCode from "http-status-codes";
import { RegistrationDto } from "./dto/registration.dto";
import { roleMiddleware } from "../../middleware/role.middleware";
import * as passport from "passport";

@Injectable()
@Controller("/auth")
class AuthController implements IController {
  constructor(private readonly authService: AuthService) {
    console.log("AuthController init");
  }

  @Post("/login", [
    passport.authenticate("jwt", { session: false }),
    roleMiddleware("admin"),
  ])
  async login(@Request() req, @Response() res, @Body() loginDto: LoginDto) {
    let response = null;
    try {
      response = await this.authService.login(loginDto);
    } catch (e) {
      console.log(e);
      res.status(e.statusCode).json(e);
      return;
    }

    res.json(response);
  }

  @Post("/logout")
  async logout(@Response() res, @Request() req) {
    let success: boolean = false;
    const token = readToken(req);
    try {
      success = await this.authService.logout(token);
    } catch (e) {
      res.status(e.statusCode).json(e);
    }

    res.status(statusCode.OK).json({ ok: success });
  }

  @Post("/registration")
  async registration(@Response() res, @Body() dto: RegistrationDto) {
    let response = null;
    try {
      response = await this.authService.registration(dto);
    } catch (e) {
      res.status(e.statusCode).json(e);
      return;
    }

    res.json(response);
  }
}

export default AuthController;
