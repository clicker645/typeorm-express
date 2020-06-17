import * as redis from "redis";
import { injectable } from "inversify";

@injectable()
export class RedisConnection {
  public client: redis.RedisClient;
  constructor() {
    this.client = redis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      db: process.env.REDIS_DB,
    });
  }
}
