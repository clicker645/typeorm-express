import "reflect-metadata";
import * as redis from "redis";
import { inject, injectable } from "inversify";
import { Config } from "../../../config/config";

@injectable()
export class RedisConnection {
  public client: redis.RedisClient;
  constructor(@inject(Config) private readonly config: Config) {
    this.client = redis.createClient(config.redis);
  }
}
