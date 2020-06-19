import { UserService } from "./user.service";
import { SqlDatabase } from "../../infrastructure/database/sql/sql.connection";
import { UserController } from "./user.controller";
import { Container } from "@decorators/di";

Container.provide([
  {
    provide: UserService,
    useFactory: (sql) => {
      new UserService(sql);
    },
    deps: [SqlDatabase],
  },
]);
