import { Application } from "express";
import { ControllerType, IController } from "./interfaces/controller.interface";
import * as express from "express";
import * as cors from "cors";
import { inject, injectable, multiInject } from "inversify";
import { Config } from "../config/config";

@injectable()
class App {
  public app: Application;

  constructor(
    @inject(Config) private readonly config: Config,
    @multiInject(ControllerType)
    private readonly controllers: IController[]
  ) {
    this.app = express();

    this.applyMiddlewares([cors(), express.json()]);
    this.initRoutes(this.controllers);
  }

  private applyMiddlewares(middlewares: any): void {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private initRoutes(controllers: IController[]): void {
    controllers.forEach((controller) => {
      this.app.use(controller.prefix, controller.router);
    });
  }

  public listen(message: string) {
    this.app.listen(this.config.app.port, () => {
      console.log(message);
    });
  }
}

export default App;
