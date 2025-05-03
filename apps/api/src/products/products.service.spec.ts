import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { CreateProductRequest, Product } from '@repo/types';

describe('ProductsService', () => {
  let service: ProductsService;

  // Mock data for testing
  const mockProduct: CreateProductRequest = {
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    stock: 10,
  };
  const mockProducts: Product[] = [
    {
      id: 'randomuuid',
      name: 'Test Product 1',
      description: 'Test Product',
      price: 150,
      stock: 20
    }
  ]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);

    for (const p of mockProducts){
      await service.create(p)
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const result = await service.create(mockProduct);

      // Check if the result is a Product object
      expect(result).toEqual({
        id: expect.any(String),
        ...mockProduct,
      });

      // Check if the product is added to the products array
      expect(service['products']).toContainEqual(result);
    });

    it('should return an error if product already exists', async () => {
      const p = {
        id: 'randomuuid',
        name: 'Test Product 1',
        description: 'Test Product',
        price: 150,
        stock: 20
      }
      await expect(service.create(p)).rejects.toThrow('Product already exists');

    })
  });

  describe('findAll', () => {
    it('return all products as an array of product', async () => {

      const p = await service.findAll()

      expect(p.length).toBe(mockProducts.length);
      expect(p.map(p => p.name)).toEqual(mockProducts.map(p => p.name));
    })
  })

  describe('findById', () => {
    it('return the corresponding product with the target ID', async () => {
      const id = 'randomuuid'
      const res = await service.findById(id)
      expect(res).toEqual(mockProducts[0])
    })
  })


});
