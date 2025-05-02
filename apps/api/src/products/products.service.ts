import { Injectable } from '@nestjs/common';
import { CreateProductRequest, Product } from '@repo/types';

@Injectable()
export class ProductsService {
  
  private readonly products: Product[] = [];


  async create(createProductRequest: CreateProductRequest) {
    // Logic to create a product
    const product: Product = {
      id: Math.random().toString(36).substring(2, 15), // Generate a random ID
      ...createProductRequest,
    };
    this.products.push(product);
    return product
  }

  async findAll() {
    // Logic to find all products
    return this.products;
  }
}
