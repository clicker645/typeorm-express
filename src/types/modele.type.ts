import { IController } from "../interfaces/controller.interface";
import { interfaces } from "inversify";

declare type Module = {
  imports?: interfaces.Container[];
  controllers?: IController[];
};

export default Module;
