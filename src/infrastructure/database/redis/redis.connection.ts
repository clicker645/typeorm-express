import * as redis from "redis";
import { Injectable } from "@decorators/di";

@Injectable()
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
