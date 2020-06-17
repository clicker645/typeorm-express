import { Token } from "../../../entities/token.entity";

export interface LoginResponse {
  userId: string;
  role: string;
  status: string;
  token: Token;
}
