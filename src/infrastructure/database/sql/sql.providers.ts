import { SqlDatabase } from "./sql.connection";
import { Container } from "@decorators/di";

Container.provide([{ provide: SqlDatabase, useClass: SqlDatabase }]);
