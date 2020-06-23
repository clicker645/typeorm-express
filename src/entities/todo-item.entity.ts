import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import * as moment from "moment";
import { statusEnum } from "../app/modules/todi-item/enums/status.emum";
import { User } from "./user.entity";

@Entity()
export class TodoItem extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: "enum", enum: statusEnum, default: statusEnum.Planed })
  status: number;

  @Column()
  userId: string;

  @Column()
  expiredAt: number;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;

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

  @ManyToOne((type) => User, (user) => user.items, { cascade: true })
  user: User;
}
