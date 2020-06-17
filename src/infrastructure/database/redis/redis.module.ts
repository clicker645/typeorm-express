import { Container } from "inversify";
import { RedisConnection } from "./redis.connection";
import { RedisService } from "./redis.service";

const redisModule = new Container();

redisModule.bind(RedisConnection).to(RedisConnection);
redisModule.bind(RedisService).to(RedisService);

export { redisModule };
