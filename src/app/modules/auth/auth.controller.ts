import * as asyncHandler from "express-async-handler";
import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";

import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { IController } from "../../interfaces/controller.interface";
import { bodyReadMiddleware } from "../../../middleware/body-read.middleware";
import { authMiddleware } from "../../../middleware/auth.middleware";

@injectable()
class AuthController implements IController {
  prefix: string = "/auth";
  router = Router();

  constructor(@inject(AuthService) private readonly authService: AuthService) {
    console.log("AuthController init");
    this.initRouters();
  }

  login = async (req: Request, res: Response) => {
    const response = await this.authService.login(req.body);

    res.json(response);
  };

  initRouters() {
    this.router.post(
      "/login",
      authMiddleware("admin"),
      bodyReadMiddleware(LoginDto),
      asyncHandler(this.login)
    );
  }
}

export default AuthController;
