import { Container } from "inversify";
import { SqlDatabase } from "./sql.connection";

const sqlModule = new Container();

sqlModule.bind(SqlDatabase).to(SqlDatabase).inSingletonScope();

export { sqlModule };
