import {
  IsOptional,
  IsString,
  MinLength,
  IsNumber,
  IsEmail,
} from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  hashdRt?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: "O email deve ser um endereço válido" })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: "A senha deve ter no mínimo 6 caracteres" })
  password?: string;
}
