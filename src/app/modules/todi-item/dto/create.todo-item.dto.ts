import { IsEnum, IsNumber, IsString } from "class-validator";

import { statusEnum } from "../enums/status.emum";

export class CreateTodoItemDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(statusEnum)
  status: number;

  @IsString()
  userId?: string;

  @IsNumber()
  expiredAt: number;
}
