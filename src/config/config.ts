import { Container, Injectable } from "@decorators/di";

const config = {
  constants: {
    BEARER_PREFIX: "Bearer ",
    SECRET_JWT: "SomeSecretKey",
    JWT_EXPIRES_IN: 86400,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    db: process.env.REDIS_DB,
  },
  mysql: {},
};

export default config;

@Injectable()
class Config {
  redis: {};
  jwt: {};

  constructor() {
    this.redis = {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      db: process.env.REDIS_DB,
    };
  }
}

Container.provide([{ provide: "CONFIG", useClass: Config }]);
