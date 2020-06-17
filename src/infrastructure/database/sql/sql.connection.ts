import { injectable } from "inversify";
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";

@injectable()
export class SqlDatabase {
  connection: Promise<Connection>;

  constructor() {
    this.connection = createConnection();
  }
}
