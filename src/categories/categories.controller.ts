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
import { CATEGORIES_SERVICE } from '../config/service.js';
import { catchError } from 'rxjs';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject(CATEGORIES_SERVICE) private readonly categoriesClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesClient
      .send({ cmd: 'create_category' }, createCategoryDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.categoriesClient
      .send({ cmd: 'find_all_categories' }, paginationDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesClient
      .send({ cmd: 'find_one_category' }, { id })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesClient
      .send({ cmd: 'update_category' }, { ...updateCategoryDto, id })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesClient
      .send({ cmd: 'remove_category' }, { id })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
