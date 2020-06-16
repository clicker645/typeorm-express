import { Container } from "inversify";
import "reflect-metadata";
import { AuthService } from "./auth.service";
import AuthController from "./auth.controller";

const authModule = new Container();

authModule.bind(AuthService).to(AuthService);
authModule.bind(AuthController).to(AuthController);

export { authModule };
