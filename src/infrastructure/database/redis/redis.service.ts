import { inject, injectable } from "inversify";
import { RedisConnection } from "./redis.connection";

@injectable()
export class RedisService {
  constructor(
    @inject(RedisConnection) private readonly redis: RedisConnection
  ) {}

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
