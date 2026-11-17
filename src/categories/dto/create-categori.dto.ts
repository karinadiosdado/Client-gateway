import { IsOptional, IsString, Length, MaxLength } from "class-validator";

export class CreateCategoriDto {
    @IsString() 
  @Length(3, 50)// rango
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)// valor maximo
  description?: string;
}
