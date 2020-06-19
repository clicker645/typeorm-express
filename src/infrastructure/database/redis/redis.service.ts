import { RedisConnection } from "./redis.connection";
import { Inject, Injectable } from "@decorators/di";

@Injectable()
export class RedisService {
  constructor(
    @Inject(RedisConnection) private readonly redis: RedisConnection
  ) {
    console.log("RedisService init");
  }

  async set(key: string, value: any, duration: number): Promise<boolean> {
    return this.redis.client.set(
      key.toString(),
      JSON.stringify(value),
      "EX",
      duration,
      (e) => {
        if (e) {
          throw new Error(e.toString());
        }
      }
    );
  }

  async exist(key: string): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      this.redis.client.exists(key, (e, ok) => {
        resolve(Boolean(ok));
        reject(e);
      });
    });

    return promise;
  }

  async get(key: string): Promise<any> {
    return this.redis.client.get(key, (e) => {
      if (e) {
        throw new Error(e.toString());
      }
    });
  }

  async delete(key: string): Promise<boolean> {
    return this.redis.client.del(key, (e) => {
      if (e) {
        throw new Error(e.toString());
      }
    });
  }
}
