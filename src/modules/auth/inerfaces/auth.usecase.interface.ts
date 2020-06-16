import { LoginResponse } from "../types/login.response";

export interface IAuthUsecase {
  login(): Promise<LoginResponse>;
}
