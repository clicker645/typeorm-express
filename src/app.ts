import * as express from "express";
import { Application } from "express";
import { IController } from "./interfaces/controller.interface";
import { attachControllers, Type } from "@decorators/express";
import AuthController from "./modules/auth/auth.controller";
import { UserController } from "./modules/user/user.controller";

class App {
  public app: Application;
  public port: number;

  constructor(appInit: {
    port: number;
    controllers: IController[];
    middlewares: any;
  }) {
    this.app = express();
    this.port = appInit.port;

    this.applyMiddlewares(appInit.middlewares);
    this.initRoutes(appInit.controllers);
  }

  private applyMiddlewares(middlewares: any): void {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private initRoutes(controllers: any): void {
    attachControllers(this.app, [AuthController, UserController]);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
