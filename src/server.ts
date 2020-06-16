import App from "./app";

import * as express from "express";
import * as cors from "cors";
import * as httpError from "http-errors";
import errorWrapMiddleware from "./middleware/error-wrap.middleware";
import AppModule from "./app.module";

const app = new App({
  port: 5000,
  controllers: [...AppModule.controllers],
  middlewares: [cors(), express.json()],
});

app.app.use((req, res, next) => {
  next(httpError(404));
});

app.app.use(errorWrapMiddleware);

app.listen();
