import { injectable, inject } from "inversify";
import { IController } from "../../interfaces/controller.interface";
import * as express from "express";
import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import "reflect-metadata";
import { validate } from "class-validator";
import * as error from "http-errors";
import * as statusCode from "http-status-codes";

@injectable()
class AuthController implements IController {
  public prefix = "/auth";
  public router = express.Router();

  constructor(@inject(AuthService) private readonly authService: AuthService) {
    this.initRoutes();
  }

  login = async (req: Request, res: Response) => {
    const data = req.body as LoginDto;

    const err = await validate(Object.assign(new LoginDto(), data));

    if (err.length > 0) {
      res.status(statusCode.UNPROCESSABLE_ENTITY).json({ message: err });
    }

    res.json(await this.authService.login(data));
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
    this.router.post("/login", asyncHandler(this.login));
    this.router.post("/logout", asyncHandler(this.logout));
    this.router.post("/registration", asyncHandler(this.registration));
    this.router.get("/confirm/:token", asyncHandler(this.confirm));
  }
}

export default AuthController;
