import { injectable } from "inversify";

@injectable()
export class Config {
  redis: { host: string; port: number; db: number };
  app: { port: number };
  jwt: { secret: string; expiresIn: number };

  constructor() {
    this.redis = {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT) || 6379,
      db: parseInt(process.env.REDIS_DB) || 1,
    };
    this.app = {
      port: parseInt(process.env.PORT) || 5000,
    };
    this.jwt = {
      secret: "SomeSecretKey",
      expiresIn: 86000,
    };
  }
}
