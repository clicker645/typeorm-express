import * as express from "express";
import { Application } from "express";
import MiddlewareType from "./types/middleware.type";
import { IController } from "./interfaces/controller.interface";

class App {
  public app: Application;
  public port: number;

  constructor(appInit: {
    port: number;
    controllers: IController[];
    middlewares: MiddlewareType[];
  }) {
    this.app = express();
    this.port = appInit.port;

    this.applyMiddlewares(appInit.middlewares);
    this.initRoutes(appInit.controllers);
  }

  private applyMiddlewares(middlewares: MiddlewareType[]): void {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private initRoutes(controllers: IController[]): void {
    controllers.forEach((controller) => {
      this.app.use(controller.prefix, controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
