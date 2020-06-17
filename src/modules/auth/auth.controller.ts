import { injectable, inject } from "inversify";
import { IController } from "../../interfaces/controller.interface";
import * as express from "express";
import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import "reflect-metadata";
import * as statusCode from "http-status-codes";
import validationMiddleware from "../../middleware/validation.middleware";

@injectable()
class AuthController implements IController {
  public prefix = "/auth";
  public router = express.Router();

  constructor(@inject(AuthService) private readonly authService: AuthService) {
    this.initRoutes();
  }

  login = async (req: Request, res: Response) => {
    let response = null;
    const loginDto = req.body as LoginDto;

    try {
      response = await this.authService.login(loginDto);
    } catch (e) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: e });
      return;
    }

    res.json(response);
  };

  logout = (req: Request, res: Response) => {
    res.send("Logout");
  };

  registration = (req: Request, res: Response) => {
    res.send("Registration");
  };

  confirm = (req: Request, res: Response) => {
    res.send(`Confirm by token, ${req.params.token}`);
  };

  public initRoutes() {
    this.router.post(
      "/login",
      validationMiddleware(LoginDto),
      asyncHandler(this.login)
    );
    this.router.post("/logout", asyncHandler(this.logout));
    this.router.post("/registration", asyncHandler(this.registration));
    this.router.get("/confirm/:token", asyncHandler(this.confirm));
  }
}

export default AuthController;
