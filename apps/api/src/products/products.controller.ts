import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductRequest } from '@repo/types';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post('')
  async create(@Body() CreateProductRequest: CreateProductRequest) {
    return this.service.create(CreateProductRequest);
  }

  @Get('')
  async findAll() {
    return this.service.findAll();
  }
}
