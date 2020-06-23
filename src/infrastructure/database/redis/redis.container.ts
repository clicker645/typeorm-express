import { Container } from "inversify";
import { RedisConnection } from "./redis.connection";
import redisTypes from "./redis.types";
import { RedisService } from "./redis.service";

const redisContainer = new Container();
redisContainer.bind(redisTypes.Connection).to(RedisConnection);
redisContainer.bind(redisTypes.Service).to(RedisService);
