import { Test, TestingModule } from '@nestjs/testing';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

describe('CatalogController', () => {
  let catalogController: CatalogController;

  const service = { getProduct: jest.fn() } as unknown as CatalogService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatalogController],
      providers: [{ provide: CatalogService, useValue: service }],
    }).compile();

    catalogController = app.get<CatalogController>(CatalogController);
  });

  it('exposes the gRPC controller methods', () => {
    expect(catalogController.getProduct).toBeDefined();
    expect(catalogController.reserveStock).toBeDefined();
  });
});
