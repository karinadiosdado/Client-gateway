import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriDto } from './create-categori.dto.js';
import { IsInt, IsPositive } from 'class-validator';

export class UpdateCategoriDto extends PartialType(CreateCategoriDto) {
   @IsInt()
  @IsPositive()
  id: number;
}
