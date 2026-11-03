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
import { PRODUCT_SERVICE } from '../config/service.js';
import { catchError } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Controller(['product', 'products'])
export class ProductController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,) { }

  @Post()
  create(@Body() CreateProductDto: CreateProductDto) {
    return this.productsClient.send({ cmd: 'createProduct' }, CreateProductDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err)
        }),
      );
  }


  // todos 
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'findAllProduct' }, paginationDto);
  }


  // id 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'findOneProduct' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err)
      }),
    );



  }



  //editar
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsClient.send(
      { cmd: 'updateProduct' },
      { id, ...updateProductDto },
    ).pipe(
        catchError((err)=>{
          throw new RpcException(err)
        }),
      );
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'deleteProduct' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

}