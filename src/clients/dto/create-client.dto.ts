import { IsEmail, IsOptional, IsString, Length, MaxLength } from "class-validator";

export class CreateClientDto {
  @IsString()
  @Length(3, 80)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  address?: string;
}
