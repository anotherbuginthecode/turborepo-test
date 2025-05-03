import { Injectable } from '@nestjs/common';
import { CreateProductRequest, Product } from '@repo/types';

@Injectable()
export class ProductsService {
  
  private readonly products: Product[] = [];

  async create(createProductRequest: CreateProductRequest): Promise<Product> {

    const alreadyExists: Product[] = this.products.filter((p) => p.name === createProductRequest.name)
    if(alreadyExists.length > 0){
      throw Error('Product already exists')
    }

    const newProduct: Product = {
      id: Math.random().toString(36).substring(2, 15), // Generate a random ID
      ...createProductRequest,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.products
  }

  async findById(id: string): Promise<Product> {
    const [p]: Product[] = this.products.filter(p => p.id === id)
    return p
  }

}
