import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { Injectable } from "@decorators/di";

@Injectable()
export class SqlDatabase {
  connection: Promise<Connection>;

  constructor() {
    console.log("SqlDatabase init");
    this.connection = createConnection();
  }
}
