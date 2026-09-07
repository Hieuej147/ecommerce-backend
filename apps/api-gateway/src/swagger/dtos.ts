import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Common
export class MoneyDto {
  @ApiProperty()
  amountMinor!: number;

  @ApiProperty()
  currency!: string;
}

export class PageInfoDto {
  @ApiProperty()
  hasNextPage!: boolean;

  @ApiProperty()
  nextPageToken!: string;
}

export class ShippingAddressDto {
  @ApiProperty()
  recipientName!: string;

  @ApiProperty()
  phone!: string;

  @ApiProperty()
  line1!: string;

  @ApiPropertyOptional()
  line2?: string;

  @ApiProperty()
  city!: string;

  @ApiPropertyOptional()
  province?: string;

  @ApiProperty()
  postalCode!: string;

  @ApiProperty()
  countryCode!: string;
}

// Catalog
export class ProductDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  price!: MoneyDto;

  @ApiProperty()
  stockQuantity!: number;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;

  @ApiProperty()
  sku!: string;

  @ApiProperty()
  categorySlug!: string;

  @ApiProperty()
  reorderPoint!: number;

  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'string' },
  })
  images!: Record<string, string>;

  @ApiProperty({ type: [String] })
  colors!: string[];

  @ApiProperty({ type: [String] })
  sizes!: string[];
}

export class ListProductsResponseDto {
  @ApiProperty({ type: [ProductDto] })
  products!: ProductDto[];

  @ApiProperty()
  pageInfo!: PageInfoDto;
}

export class CreateProductBodyDto {
  @ApiProperty()
  slug!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  stockQuantity!: number;

  @ApiProperty()
  price!: MoneyDto;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: { type: 'string' },
  })
  images?: Record<string, string>;

  @ApiPropertyOptional({ type: [String] })
  colors?: string[];

  @ApiPropertyOptional({ type: [String] })
  sizes?: string[];
}

export class UpdateProductBodyDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  stockQuantity?: number;

  @ApiPropertyOptional()
  price?: MoneyDto;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: { type: 'string' },
  })
  images?: Record<string, string>;

  @ApiPropertyOptional({ type: [String] })
  colors?: string[];

  @ApiPropertyOptional({ type: [String] })
  sizes?: string[];
}

// Orders
export class OrderItemDto {
  @ApiProperty()
  productId!: string;

  @ApiProperty()
  productName!: string;

  @ApiProperty()
  quantity!: number;

  @ApiProperty()
  unitPrice!: MoneyDto;

  @ApiProperty()
  lineTotal!: MoneyDto;
}

export class OrderDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty({ type: [OrderItemDto] })
  items!: OrderItemDto[];

  @ApiProperty()
  subtotal!: MoneyDto;

  @ApiProperty()
  total!: MoneyDto;

  @ApiProperty()
  shippingAddress!: ShippingAddressDto;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  paymentStatus!: string;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;

  @ApiProperty()
  customerName!: string;

  @ApiProperty()
  customerEmail!: string;
}

export class CreateOrderItemDto {
  @ApiProperty()
  productId!: string;

  @ApiProperty()
  quantity!: number;
}

export class CreateOrderBodyDto {
  @ApiProperty({ type: [CreateOrderItemDto] })
  items!: CreateOrderItemDto[];

  @ApiProperty()
  shippingAddress!: ShippingAddressDto;

  @ApiPropertyOptional()
  idempotencyKey?: string;
}

export class ListOrdersResponseDto {
  @ApiProperty({ type: [OrderDto] })
  orders!: OrderDto[];

  @ApiProperty()
  pageInfo!: PageInfoDto;
}

// Payments
export class CheckoutBodyDto {
  @ApiProperty()
  orderId!: string;

  @ApiProperty()
  successUrl!: string;

  @ApiProperty()
  cancelUrl!: string;

  @ApiPropertyOptional()
  idempotencyKey?: string;
}

export class CheckoutResponseDto {
  @ApiProperty()
  sessionUrl!: string;
}

export class PaymentDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  orderId!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  amount!: MoneyDto;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  provider!: string;

  @ApiProperty()
  providerPaymentId!: string;

  @ApiProperty()
  createdAt!: string;
}

// Users
export class CurrentUserDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  clerkId!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty()
  displayName!: string;

  @ApiProperty()
  imageUrl!: string;

  @ApiProperty()
  role!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}

export class NotificationDto {
  @ApiProperty()
  id!: string;

  @ApiPropertyOptional()
  userId?: string;

  @ApiPropertyOptional()
  targetRole?: string;

  @ApiProperty({ enum: ['ORDER_CREATED', 'ORDER_SHIPPED', 'ORDER_CANCELLED', 'PAYMENT_SUCCESS', 'PAYMENT_FAILED', 'PRODUCT_LOW_STOCK', 'NEW_CUSTOMER', 'SYSTEM_ALERT'] })
  type!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  message!: string;

  @ApiPropertyOptional()
  data?: Record<string, unknown>;

  @ApiPropertyOptional()
  href?: string;

  @ApiProperty()
  read!: boolean;

  @ApiPropertyOptional()
  readAt?: string;

  @ApiProperty()
  createdAt!: string;

  @ApiPropertyOptional()
  orderId?: string;
}

export class UnreadCountDto {
  @ApiProperty()
  unreadCount!: number;
}

