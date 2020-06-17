import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { statusEnum } from "../enums/status.enum";
import { rolesEnum } from "../enums/roles.enum";

export class CreateUserDto {
  @IsOptional()
  @IsEnum(statusEnum)
  status: number;

  @IsString()
  login: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(rolesEnum)
  role: string;
}
