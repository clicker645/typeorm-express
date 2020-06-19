import { IsEmail, IsString } from "class-validator";

export class RegistrationDto {
  @IsEmail()
  email: string;

  @IsString()
  login: string;

  @IsString()
  password: string;
}
