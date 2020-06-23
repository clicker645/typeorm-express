import "reflect-metadata";
import { injectable } from "inversify";
import { Connection, createConnection } from "typeorm";

@injectable()
export class SqlDatabase {
  connection: Promise<Connection>;

  constructor() {
    console.log("SqlDatabase init");
    this.connection = createConnection();
  }
}
