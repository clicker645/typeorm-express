import * as express from "express";

export interface IController {
  prefix: string;
  router: express.Router;
}
