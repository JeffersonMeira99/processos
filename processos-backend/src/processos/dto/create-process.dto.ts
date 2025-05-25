import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsNumber,
} from "class-validator";
import { ProcessStatus } from "../processo.entity";

export class CreateProcessDto {
  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  claimant: string;

  @IsString()
  @IsNotEmpty()
  defendant: string;

  @IsEnum(ProcessStatus)
  status: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  opening_date: Date;

  @IsNumber()
  @IsNotEmpty()
  userId?: number;
}
