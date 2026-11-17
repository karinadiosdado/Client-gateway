import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common/dto/pagination.dto.js';
import { CLIENTS_SERVICE } from '../config/service.js';
import { catchError } from 'rxjs';
import { CreateClientDto } from './dto/create-client.dto.js';
import { UpdateClientDto } from './dto/update-client.dto.js';

@Controller('customers')
export class ClientsController {
  constructor(
    @Inject(CLIENTS_SERVICE) private readonly clientsClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsClient
      .send({ cmd: 'create_customer' }, createClientDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.clientsClient
      .send({ cmd: 'find_all_customers' }, paginationDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientsClient
      .send({ cmd: 'find_one_customer' }, id)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsClient
      .send({ cmd: 'update_customer' }, { ...updateClientDto, id })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientsClient
      .send({ cmd: 'remove_customer' }, { id })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
