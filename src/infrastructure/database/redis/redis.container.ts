import { Container } from "inversify";
import { RedisConnection } from "./redis.connection";
import { RedisService } from "./redis.service";

export const redisContainer = new Container();
redisContainer.bind(RedisConnection).to(RedisConnection).inSingletonScope();
redisContainer.bind(RedisService).to(RedisService).inSingletonScope();
