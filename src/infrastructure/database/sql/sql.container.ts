import { Container } from "inversify";
import { SqlDatabase } from "./sql.connection";

export const sqlContainer = new Container();
sqlContainer.bind(SqlDatabase).to(SqlDatabase).inSingletonScope();
