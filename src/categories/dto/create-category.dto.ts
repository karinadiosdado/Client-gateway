import { IsOptional, IsString, Length, MaxLength } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description?: string;
}
