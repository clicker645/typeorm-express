import { Token } from "../../../entities/token.entity";
import { User } from "../../../entities/user.entity";

export class LoginResponse {
  userId: string;
  role: string;
  status: number;
  token: Token;

  factory(user: User, token: Token): LoginResponse {
    this.userId = user.id;
    this.role = user.role;
    this.status = user.status;
    this.token = token;

    return this;
  }
}
