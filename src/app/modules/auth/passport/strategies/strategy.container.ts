import { Container, interfaces } from "inversify";
import { JwtStrategy } from "./jwt.strategy";
import { RedisService } from "../../../../../infrastructure/database/redis/redis.service";
import { Config } from "../../../../../config/config";

export let strategyContainer = new Container() as interfaces.Container;

strategyContainer.bind(JwtStrategy).toFactory((context: interfaces.Context) => {
  return () => {
    const redis = context.container.get(RedisService);
    const config = context.container.get(Config);
    const jwt = new JwtStrategy(redis, config);

    return jwt.strategy;
  };
});
