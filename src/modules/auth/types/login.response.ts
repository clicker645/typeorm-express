import { TokenEntity } from "../../../entities/token.entity";

export interface LoginResponse {
  userId: string;
  role: string;
  status: string;
  token: TokenEntity;
}
