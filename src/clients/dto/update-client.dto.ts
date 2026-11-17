import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto.js';
import { IsInt, IsPositive } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsInt()
  @IsPositive()
  id: number;
}
