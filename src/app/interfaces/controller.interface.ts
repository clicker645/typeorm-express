import * as express from "express";

export const ControllerType = Symbol.for("Controller");

export interface IController {
  prefix: string;
  router: express.Router;
}
