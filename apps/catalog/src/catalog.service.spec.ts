import { RpcException } from '@nestjs/microservices';
import { CatalogService } from './catalog.service';

describe('CatalogService', () => {
  const prisma = {
    product: { findUnique: jest.fn(), findMany: jest.fn(), create: jest.fn(), update: jest.fn() },
    stockReservation: { findUnique: jest.fn(), create: jest.fn(), update: jest.fn() },
    $transaction: jest.fn(),
  } as unknown as ConstructorParameters<typeof CatalogService>[0];
  let service: CatalogService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CatalogService(prisma);
  });

  it('returns NOT_FOUND for a missing product', async () => {
    prisma.product.findUnique.mockResolvedValue(null);
    await expect(service.getProduct({ productId: 'missing' })).rejects.toBeInstanceOf(RpcException);
  });

  it('rejects invalid product input', async () => {
    await expect(service.createProduct({ slug: '', name: '', description: '', stockQuantity: -1, price: undefined }, 'admin')).rejects.toBeInstanceOf(RpcException);
  });

  it('rejects product mutation without admin metadata', async () => {
    await expect(service.createProduct({ slug: 'shoe', name: 'Shoe', description: '', stockQuantity: 1, price: { amountMinor: 100, currency: 'VND' } })).rejects.toBeInstanceOf(RpcException);
  });

  it('creates a product and maps money fields', async () => {
    prisma.product.create.mockResolvedValue({ id: 'p1', slug: 'shoe', name: 'Shoe', description: '', priceAmountMinor: 1000n, currency: 'VND', stockQuantity: 2, status: 'ACTIVE', createdAt: new Date(), updatedAt: new Date() });
    const product = await service.createProduct({ slug: 'shoe', name: 'Shoe', description: '', stockQuantity: 2, price: { amountMinor: 1000, currency: 'VND' } }, 'admin');
    expect(product.id).toBe('p1');
    expect(product.price?.amountMinor).toBe(1000);
  });
});
