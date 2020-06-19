import App from "./app";
import "reflect-metadata";
import * as express from "express";
import * as cors from "cors";
import AuthController from "./modules/auth/auth.controller";
import { UserController } from "./modules/user/user.controller";
import errorWrapMiddleware from "./middleware/error-wrap.middleware";

const app = new App({
  port: 5000,
  controllers: [AuthController, UserController],
  middlewares: [cors(), express.json()],
});

app.app.use(errorWrapMiddleware);

app.listen();
