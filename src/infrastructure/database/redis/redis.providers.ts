import { RedisConnection } from "./redis.connection";
import { RedisService } from "./redis.service";
import { Container } from "@decorators/di";

Container.provide([
  {
    provide: RedisConnection,
    useClass: RedisConnection,
  },
  {
    provide: RedisService,
    useFactory: (connection) => {
      new RedisService(connection);
    },
    deps: [RedisConnection],
  },
]);
