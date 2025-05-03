import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductRequest, Product } from '@repo/types';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  // Mock data for testing
  const mockProduct = {
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    stock: 10,
  }

  const mockProducts = []

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn((mockProduct) => {
              return {
                id: expect.any(String),
                ...mockProduct,
              };
            }),
            findAll: jest.fn(() => {
              return {
                items: mockProducts,
                count: mockProducts.length,
              }
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createProductRequest: CreateProductRequest = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        stock: 10,
      };

      const result = await controller.create(createProductRequest);
      expect(result).toEqual({
        id: expect.any(String),
        ...createProductRequest,
      });
    });
  });
});
