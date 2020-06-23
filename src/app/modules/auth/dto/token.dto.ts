import { User } from "../../../../entities/user.entity";
import { classToPlain } from "class-transformer";

export class TokenDto {
  userId: string;
  role: string;
  status: number;

  factoryByUser(user: User): Object {
    this.userId = user.id;
    this.role = user.role;
    this.status = user.status;

    return classToPlain(this);
  }
}
