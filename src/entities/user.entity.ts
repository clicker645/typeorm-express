import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { statusEnum } from "../app/modules/user/enums/status.enum";
import * as bcrypt from "bcrypt";
import moment = require("moment");
import { rolesEnum } from "../app/modules/user/enums/roles.enum";
import { TodoItem } from "./todo-item.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  login: string;

  @Column({ type: "enum", enum: statusEnum, default: statusEnum.Pending })
  status: number;

  @Column({ type: "enum", enum: rolesEnum, default: rolesEnum.user })
  role: string;

  @Column()
  password: string;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  @BeforeInsert()
  async setCreateAd() {
    const timeNow = moment().unix();
    this.createdAt = timeNow;
    this.updatedAt = timeNow;
  }

  @BeforeUpdate()
  async setUpdatedAt() {
    this.updatedAt = moment().unix();
  }

  //========================//

  @OneToMany((type) => TodoItem, (item) => item.user)
  items: TodoItem[];
}
