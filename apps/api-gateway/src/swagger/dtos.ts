import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ==========================================
// Common & Error DTOs
// ==========================================

export class MoneyDto {
  @ApiProperty({
    description: 'Amount in minor currency units (e.g. cents for USD, raw value for VND)',
    example: 199000,
  })
  amountMinor!: number;

  @ApiProperty({
    description: 'Three-letter ISO 4217 currency code',
    example: 'VND',
  })
  currency!: string;
}

export class PageInfoDto {
  @ApiProperty({
    description: 'Indicates whether more results are available on subsequent pages',
    example: false,
  })
  hasNextPage!: boolean;

  @ApiProperty({
    description: 'Opaque pagination cursor token to retrieve the next page',
    example: '',
  })
  nextPageToken!: string;
}

export class ShippingAddressDto {
  @ApiProperty({
    description: 'Full name of the recipient',
    example: 'Nguyen Van A',
  })
  recipientName!: string;

  @ApiProperty({
    description: 'Contact phone number for delivery updates',
    example: '+84901234567',
  })
  phone!: string;

  @ApiProperty({
    description: 'Primary street address line (number, street)',
    example: '123 Le Loi Street',
  })
  line1!: string;

  @ApiPropertyOptional({
    description: 'Secondary address line (apartment, suite, unit)',
    example: 'Apt 4B',
  })
  line2?: string;

  @ApiProperty({
    description: 'City or municipality name',
    example: 'Ho Chi Minh',
  })
  city!: string;

  @ApiPropertyOptional({
    description: 'State, province, or district',
    example: 'District 1',
  })
  province?: string;

  @ApiProperty({
    description: 'Postal or ZIP code',
    example: '700000',
  })
  postalCode!: string;

  @ApiProperty({
    description: 'Two-letter ISO 3166-1 alpha-2 country code',
    example: 'VN',
  })
  countryCode!: string;
}

export class ErrorResponseDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode!: number;

  @ApiProperty({
    description: 'Detailed error message or validation failure descriptions',
    oneOf: [
      { type: 'string', example: 'Product with slug already exists' },
      { type: 'array', items: { type: 'string' }, example: ['name should not be empty'] },
    ],
  })
  message!: string | string[];

  @ApiProperty({
    description: 'HTTP error title / name',
    example: 'Bad Request',
  })
  error!: string;
}

// ==========================================
// Catalog / Products DTOs
// ==========================================

export class ProductDto {
  @ApiProperty({
    description: 'Unique product identifier (UUID)',
    example: 'prod_90fa8b21-4f32-45a8-bf2b-5e6f66300001',
  })
  id!: string;

  @ApiProperty({
    description: 'Unique SEO-friendly URL slug',
    example: 'nmd-r1-shoes',
  })
  slug!: string;

  @ApiProperty({
    description: 'Product title / name',
    example: 'NMD_R1 Shoes',
  })
  name!: string;

  @ApiProperty({
    description: 'Detailed product description supporting rich formatting',
    example: 'Iconic streetwear silhouette with responsive Boost cushioning and breathable primeknit upper.',
  })
  description!: string;

  @ApiProperty({
    description: 'Product price structure with amount and currency',
    type: () => MoneyDto,
  })
  price!: MoneyDto;

  @ApiProperty({
    description: 'Current available stock inventory',
    example: 45,
  })
  stockQuantity!: number;

  @ApiProperty({
    description: 'Publishing lifecycle status',
    enum: ['ACTIVE', 'ARCHIVED', 'DRAFT'],
    example: 'ACTIVE',
  })
  status!: string;

  @ApiProperty({
    description: 'Creation timestamp in ISO 8601 format',
    example: '2026-03-15T08:30:00.000Z',
  })
  createdAt!: string;

  @ApiProperty({
    description: 'Last update timestamp in ISO 8601 format',
    example: '2026-03-15T09:15:00.000Z',
  })
  updatedAt!: string;

  @ApiProperty({
    description: 'Stock Keeping Unit (SKU) identifier',
    example: 'AD-NMD-001',
  })
  sku!: string;

  @ApiProperty({
    description: 'Category slug this product belongs to',
    example: 'footwear',
  })
  categorySlug!: string;

  @ApiProperty({
    description: 'Low-stock threshold that triggers automated admin notifications',
    example: 20,
  })
  reorderPoint!: number;

  @ApiProperty({
    description: 'Key-value mapping of color variants to public image URLs',
    type: 'object',
    additionalProperties: { type: 'string' },
    example: {
      black: 'http://localhost:3000/v1/media/products/nmd-black.png',
      white: 'http://localhost:3000/v1/media/products/nmd-white.png',
      grey: 'http://localhost:3000/v1/media/products/nmd-grey.png',
    },
  })
  images!: Record<string, string>;

  @ApiProperty({
    description: 'List of color variations available for this product',
    type: [String],
    example: ['black', 'white', 'grey'],
  })
  colors!: string[];

  @ApiProperty({
    description: 'List of sizes available for this product',
    type: [String],
    example: ['S', 'M', 'L', 'XL'],
  })
  sizes!: string[];
}

export class ListProductsResponseDto {
  @ApiProperty({
    description: 'Array of products matching filter criteria',
    type: [ProductDto],
  })
  products!: ProductDto[];

  @ApiProperty({
    description: 'Pagination metadata for cursor-based traversal',
    type: () => PageInfoDto,
  })
  pageInfo!: PageInfoDto;
}

export class CreateProductBodyDto {
  @ApiProperty({
    description: 'Unique URL slug for the product',
    example: 'nmd-r1-shoes',
  })
  slug!: string;

  @ApiProperty({
    description: 'Product display name',
    example: 'NMD_R1 Shoes',
  })
  name!: string;

  @ApiProperty({
    description: 'Detailed description of the product',
    example: 'Iconic sneaker engineered for comfort and everyday performance.',
  })
  description!: string;

  @ApiProperty({
    description: 'Initial inventory quantity',
    example: 50,
  })
  stockQuantity!: number;

  @ApiPropertyOptional({
    description: 'Structured price object (amountMinor and currency)',
    type: () => MoneyDto,
  })
  price?: MoneyDto;

  @ApiPropertyOptional({
    description: 'Flat price amount in minor units (e.g. 199000 for 199,000 VND). Ignored if "price" object is provided.',
    example: 199000,
  })
  priceAmountMinor?: number;

  @ApiPropertyOptional({
    description: 'Currency code if using priceAmountMinor (defaults to VND)',
    example: 'VND',
    default: 'VND',
  })
  currency?: string;

  @ApiPropertyOptional({
    description: 'Stock Keeping Unit (SKU) identifier',
    example: 'AD-NMD-001',
  })
  sku?: string;

  @ApiPropertyOptional({
    description: 'Category slug identifier',
    example: 'footwear',
  })
  categorySlug?: string;

  @ApiPropertyOptional({
    description: 'Low-stock alert threshold (defaults to 20)',
    example: 20,
    default: 20,
  })
  reorderPoint?: number;

  @ApiPropertyOptional({
    description: 'Dictionary mapping color variants to uploaded image URLs',
    type: 'object',
    additionalProperties: { type: 'string' },
    example: {
      black: 'http://localhost:3000/v1/media/products/nmd-black.png',
      white: 'http://localhost:3000/v1/media/products/nmd-white.png',
    },
  })
  images?: Record<string, string>;

  @ApiPropertyOptional({
    description: 'List of available color options',
    type: [String],
    example: ['black', 'white', 'grey'],
  })
  colors?: string[];

  @ApiPropertyOptional({
    description: 'List of available sizes',
    type: [String],
    example: ['S', 'M', 'L', 'XL'],
  })
  sizes?: string[];
}

export class UpdateProductBodyDto {
  @ApiPropertyOptional({
    description: 'Updated product display name',
    example: 'NMD_R1 Shoes - Edition 2026',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Updated product description',
    example: 'Updated specifications with improved weather resistance.',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Updated inventory quantity',
    example: 80,
  })
  stockQuantity?: number;

  @ApiPropertyOptional({
    description: 'Updated structured price',
    type: () => MoneyDto,
  })
  price?: MoneyDto;

  @ApiPropertyOptional({
    description: 'Updated flat price in minor currency units',
    example: 219000,
  })
  priceAmountMinor?: number;

  @ApiPropertyOptional({
    description: 'Updated currency code',
    example: 'VND',
  })
  currency?: string;

  @ApiPropertyOptional({
    description: 'Updated SKU',
    example: 'AD-NMD-001-V2',
  })
  sku?: string;

  @ApiPropertyOptional({
    description: 'Updated category slug',
    example: 'footwear',
  })
  categorySlug?: string;

  @ApiPropertyOptional({
    description: 'Updated reorder threshold',
    example: 15,
  })
  reorderPoint?: number;

  @ApiPropertyOptional({
    description: 'Product lifecycle status',
    enum: ['ACTIVE', 'ARCHIVED', 'DRAFT'],
    example: 'ACTIVE',
  })
  status?: string;

  @ApiPropertyOptional({
    description: 'Updated map of variant colors to image URLs',
    type: 'object',
    additionalProperties: { type: 'string' },
    example: {
      black: 'http://localhost:3000/v1/media/products/nmd-black-v2.png',
    },
  })
  images?: Record<string, string>;

  @ApiPropertyOptional({
    description: 'Updated list of colors',
    type: [String],
    example: ['black', 'white'],
  })
  colors?: string[];

  @ApiPropertyOptional({
    description: 'Updated list of sizes',
    type: [String],
    example: ['M', 'L', 'XL'],
  })
  sizes?: string[];
}

export class PresignedUploadUrlBodyDto {
  @ApiProperty({
    description: 'Target filename with extension (e.g. shoe.png)',
    example: 'shoe.png',
  })
  fileName!: string;

  @ApiProperty({
    description: 'MIME type of the upload file',
    example: 'image/png',
  })
  contentType!: string;

  @ApiPropertyOptional({
    description: 'Folder or directory path in storage',
    example: 'products',
    default: 'products',
  })
  folder?: string;

  @ApiPropertyOptional({
    description: 'Associated product ID if known',
    example: 'prod_90fa8b21-4f32-45a8-bf2b-5e6f66300001',
  })
  productId?: string;
}

export class PresignedUploadUrlDto {
  @ApiProperty({
    description: 'Presigned S3/MinIO upload URL for PUT request',
    example: 'https://storage.example.com/ecommerce-media/products/uuid.png?X-Amz-Algorithm=...',
  })
  uploadUrl!: string;

  @ApiProperty({
    description: 'Storage file path key',
    example: 'products/uuid.png',
  })
  fileKey!: string;

  @ApiProperty({
    description: 'Publicly readable media URL for client consumption',
    example: 'http://localhost:3000/v1/media/products/uuid.png',
  })
  publicUrl!: string;
}

// ==========================================
// Orders DTOs
// ==========================================

export class OrderItemDto {
  @ApiProperty({
    description: 'Product identifier',
    example: 'prod_90fa8b21-4f32-45a8-bf2b-5e6f66300001',
  })
  productId!: string;

  @ApiProperty({
    description: 'Product snapshot name at time of order creation',
    example: 'NMD_R1 Shoes',
  })
  productName!: string;

  @ApiProperty({
    description: 'Quantity ordered',
    example: 2,
  })
  quantity!: number;

  @ApiProperty({
    description: 'Unit price of the item',
    type: () => MoneyDto,
  })
  unitPrice!: MoneyDto;

  @ApiProperty({
    description: 'Total line price (quantity * unitPrice)',
    type: () => MoneyDto,
  })
  lineTotal!: MoneyDto;
}

export class OrderDto {
  @ApiProperty({
    description: 'Unique order identifier (UUID)',
    example: 'ord_12345678-abcd-ef01-2345-6789abcdef01',
  })
  id!: string;

  @ApiProperty({
    description: 'Clerk User ID of the customer who placed the order',
    example: 'user_2bA9kL0xZy123',
  })
  userId!: string;

  @ApiProperty({
    description: 'List of ordered items',
    type: [OrderItemDto],
  })
  items!: OrderItemDto[];

  @ApiProperty({
    description: 'Order subtotal amount before shipping/taxes',
    type: () => MoneyDto,
  })
  subtotal!: MoneyDto;

  @ApiProperty({
    description: 'Final order total amount',
    type: () => MoneyDto,
  })
  total!: MoneyDto;

  @ApiProperty({
    description: 'Customer shipping destination details',
    type: () => ShippingAddressDto,
  })
  shippingAddress!: ShippingAddressDto;

  @ApiProperty({
    description: 'Order fulfillment status',
    enum: [
      'PENDING_PAYMENT',
      'PAID',
      'PROCESSING',
      'SHIPPED',
      'DELIVERED',
      'CANCELLED',
    ],
    example: 'PENDING_PAYMENT',
  })
  status!: string;

  @ApiProperty({
    description: 'Order payment status',
    enum: ['UNPAID', 'PENDING', 'PAID', 'FAILED', 'REFUNDED'],
    example: 'UNPAID',
  })
  paymentStatus!: string;

  @ApiProperty({
    description: 'Order placement timestamp in ISO 8601',
    example: '2026-03-20T10:00:00.000Z',
  })
  createdAt!: string;

  @ApiProperty({
    description: 'Order last updated timestamp in ISO 8601',
    example: '2026-03-20T10:05:00.000Z',
  })
  updatedAt!: string;

  @ApiProperty({
    description: 'Customer full name',
    example: 'Nguyen Van A',
  })
  customerName!: string;

  @ApiProperty({
    description: 'Customer email address',
    example: 'customer@example.com',
  })
  customerEmail!: string;
}

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'Product identifier (UUID)',
    example: 'prod_90fa8b21-4f32-45a8-bf2b-5e6f66300001',
  })
  productId!: string;

  @ApiProperty({
    description: 'Quantity to order (must be positive integer)',
    example: 1,
    minimum: 1,
  })
  quantity!: number;
}

export class CreateOrderBodyDto {
  @ApiProperty({
    description: 'List of product items to purchase',
    type: [CreateOrderItemDto],
  })
  items!: CreateOrderItemDto[];

  @ApiProperty({
    description: 'Delivery destination address',
    type: () => ShippingAddressDto,
  })
  shippingAddress!: ShippingAddressDto;

  @ApiPropertyOptional({
    description: 'Optional client-generated idempotency key (UUID) to avoid duplicate order placements on network retries',
    example: 'e4f2b963-4412-4c20-a612-dfa68e89f81a',
  })
  idempotencyKey?: string;
}

export class ListOrdersResponseDto {
  @ApiProperty({
    description: 'Array of orders matching the query',
    type: [OrderDto],
  })
  orders!: OrderDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: () => PageInfoDto,
  })
  pageInfo!: PageInfoDto;
}

export class OrderMetricsDto {
  @ApiProperty({
    description: 'Total number of orders',
    example: 142,
  })
  orderCount!: number;

  @ApiProperty({
    description: 'Number of successfully paid orders',
    example: 128,
  })
  paidOrderCount!: number;

  @ApiProperty({
    description: 'Number of orders pending payment',
    example: 10,
  })
  pendingOrderCount!: number;

  @ApiProperty({
    description: 'Total revenue in minor currency units',
    example: 25600000,
  })
  revenueAmountMinor!: number;

  @ApiProperty({
    description: 'Currency of the aggregated revenue',
    example: 'VND',
  })
  currency!: string;
}

// ==========================================
// Payments DTOs
// ==========================================

export class CheckoutBodyDto {
  @ApiProperty({
    description: 'The unique Order ID to initialize payment for',
    example: 'ord_12345678-abcd-ef01-2345-6789abcdef01',
  })
  orderId!: string;

  @ApiProperty({
    description: 'Client return URL when payment is completed successfully. Supports Stripe template variable {CHECKOUT_SESSION_ID}',
    example: 'http://localhost:3000/checkout/success?orderId=ord_12345678-abcd-ef01-2345-6789abcdef01&session_id={CHECKOUT_SESSION_ID}',
  })
  successUrl!: string;

  @ApiProperty({
    description: 'Client return URL if the user cancels or navigates back from Stripe Checkout',
    example: 'http://localhost:3000/cart',
  })
  cancelUrl!: string;

  @ApiPropertyOptional({
    description: 'Optional idempotency key (UUID) to prevent multiple Stripe session creations',
    example: '7c89f5a0-9bc2-4467-b501-140b2fcf08a1',
  })
  idempotencyKey?: string;
}

export class CheckoutResponseDto {
  @ApiProperty({
    description: 'Primary Stripe Checkout hosted URL. Frontend should redirect the user or open via WebBrowser/In-App browser to this URL.',
    example: 'https://checkout.stripe.com/c/pay/cs_test_a1b2c3d4e5f6',
  })
  checkoutUrl!: string;

  @ApiPropertyOptional({
    description: 'Payment entity ID created for this checkout session',
    example: 'pay_98765432-1234-5678-90ab-cdef12345678',
  })
  paymentId?: string;

  @ApiPropertyOptional({
    description: 'Associated order ID',
    example: 'ord_12345678-abcd-ef01-2345-6789abcdef01',
  })
  orderId?: string;

  @ApiPropertyOptional({
    description: 'Stripe Checkout Session ID (cs_test_...)',
    example: 'cs_test_a1b2c3d4e5f6',
  })
  providerSessionId?: string;

  @ApiPropertyOptional({
    description: 'Initial payment status (e.g. PENDING)',
    example: 'PENDING',
  })
  status?: string;

  @ApiPropertyOptional({
    description: 'Alias for checkoutUrl for backwards compatibility with earlier client versions',
    example: 'https://checkout.stripe.com/c/pay/cs_test_a1b2c3d4e5f6',
  })
  sessionUrl?: string;
}

export class PaymentDto {
  @ApiProperty({
    description: 'Unique payment identifier (UUID)',
    example: 'pay_98765432-1234-5678-90ab-cdef12345678',
  })
  id!: string;

  @ApiProperty({
    description: 'Associated order ID',
    example: 'ord_12345678-abcd-ef01-2345-6789abcdef01',
  })
  orderId!: string;

  @ApiProperty({
    description: 'Clerk User ID of the payer',
    example: 'user_2bA9kL0xZy123',
  })
  userId!: string;

  @ApiProperty({
    description: 'Payment amount and currency',
    type: () => MoneyDto,
  })
  amount!: MoneyDto;

  @ApiProperty({
    description: 'Payment transaction status',
    enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'],
    example: 'PAID',
  })
  status!: string;

  @ApiProperty({
    description: 'Payment provider name',
    example: 'STRIPE',
  })
  provider!: string;

  @ApiProperty({
    description: 'External payment transaction or session ID from provider',
    example: 'pi_3PjX1234567890abcdef',
  })
  providerPaymentId!: string;

  @ApiProperty({
    description: 'Payment record creation timestamp',
    example: '2026-03-20T10:02:00.000Z',
  })
  createdAt!: string;
}

export class PaymentMetricsDto {
  @ApiProperty({
    description: 'Total payment attempts initialized',
    example: 150,
  })
  totalCount!: number;

  @ApiProperty({
    description: 'Number of successfully settled payments',
    example: 135,
  })
  paidCount!: number;

  @ApiProperty({
    description: 'Number of failed payments',
    example: 5,
  })
  failedCount!: number;

  @ApiProperty({
    description: 'Number of pending payments',
    example: 10,
  })
  pendingCount!: number;

  @ApiProperty({
    description: 'Currency code',
    example: 'VND',
  })
  currency!: string;
}

// ==========================================
// Users DTOs
// ==========================================

export class CurrentUserDto {
  @ApiProperty({
    description: 'Internal database user UUID',
    example: 'usr_f81d4fae-7dec-11d0-a765-00a0c91e6bf6',
  })
  id!: string;

  @ApiProperty({
    description: 'Clerk Authentication User ID',
    example: 'user_2bA9kL0xZy123',
  })
  clerkId!: string;

  @ApiProperty({
    description: 'Primary email address',
    example: 'user@example.com',
  })
  email!: string;

  @ApiProperty({
    description: 'First name',
    example: 'Van A',
  })
  firstName!: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Nguyen',
  })
  lastName!: string;

  @ApiProperty({
    description: 'Computed display name',
    example: 'Nguyen Van A',
  })
  displayName!: string;

  @ApiProperty({
    description: 'Avatar image URL',
    example: 'https://img.clerk.com/avatars/user_2bA9kL0xZy123.png',
  })
  imageUrl!: string;

  @ApiProperty({
    description: 'User access role',
    enum: ['customer', 'admin'],
    example: 'customer',
  })
  role!: string;

  @ApiProperty({
    description: 'User account status',
    enum: ['active', 'suspended', 'deleted'],
    example: 'active',
  })
  status!: string;

  @ApiProperty({
    description: 'Account registration timestamp',
    example: '2026-01-10T12:00:00.000Z',
  })
  createdAt!: string;

  @ApiProperty({
    description: 'Profile last updated timestamp',
    example: '2026-03-18T15:30:00.000Z',
  })
  updatedAt!: string;
}

export class ListUsersResponseDto {
  @ApiProperty({
    description: 'List of registered users matching criteria',
    type: [CurrentUserDto],
  })
  users!: CurrentUserDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: () => PageInfoDto,
  })
  pageInfo!: PageInfoDto;
}

// ==========================================
// Notifications DTOs
// ==========================================

export class NotificationDto {
  @ApiProperty({
    description: 'Notification identifier (UUID)',
    example: 'notif_77a1b2c3-d4e5-6789-0123-abcdef456789',
  })
  id!: string;

  @ApiPropertyOptional({
    description: 'Target Clerk User ID if personal notification',
    example: 'user_2bA9kL0xZy123',
  })
  userId?: string;

  @ApiPropertyOptional({
    description: 'Target role for broadcast notifications (e.g. admin)',
    example: 'admin',
  })
  targetRole?: string;

  @ApiProperty({
    description: 'Notification event type classification',
    enum: [
      'ORDER_CREATED',
      'ORDER_SHIPPED',
      'ORDER_CANCELLED',
      'PAYMENT_SUCCESS',
      'PAYMENT_FAILED',
      'PRODUCT_LOW_STOCK',
      'NEW_CUSTOMER',
      'SYSTEM_ALERT',
    ],
    example: 'ORDER_CREATED',
  })
  type!: string;

  @ApiProperty({
    description: 'Notification headline title',
    example: 'Order Confirmed',
  })
  title!: string;

  @ApiProperty({
    description: 'Notification detailed message',
    example: 'Your order ord_12345678 has been successfully placed.',
  })
  message!: string;

  @ApiPropertyOptional({
    description: 'Structured event payload / metadata',
    type: 'object',
    additionalProperties: true,
    example: {
      orderId: 'ord_12345678-abcd-ef01-2345-6789abcdef01',
      totalAmountMinor: 199000,
    },
  })
  data?: Record<string, unknown>;

  @ApiPropertyOptional({
    description: 'Deep link or web URL for frontend navigation',
    example: '/orders/ord_12345678-abcd-ef01-2345-6789abcdef01',
  })
  href?: string;

  @ApiProperty({
    description: 'Whether the notification has been marked as read',
    example: false,
  })
  read!: boolean;

  @ApiPropertyOptional({
    description: 'Timestamp when notification was marked as read',
    example: '2026-03-20T10:15:00.000Z',
  })
  readAt?: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2026-03-20T10:00:00.000Z',
  })
  createdAt!: string;

  @ApiPropertyOptional({
    description: 'Associated Order ID if applicable',
    example: 'ord_12345678-abcd-ef01-2345-6789abcdef01',
  })
  orderId?: string;
}

export class UnreadCountDto {
  @ApiProperty({
    description: 'Count of unread notifications for badge counter',
    example: 3,
  })
  unreadCount!: number;
}

// ==========================================
// Media DTOs
// ==========================================

export class UploadMediaResponseDto {
  @ApiProperty({
    description: 'Public URL path to access or stream the uploaded image',
    example: '/v1/media/products/90fa8b21-4f32-45a8-bf2b-5e6f66300001.png',
  })
  url!: string;

  @ApiProperty({
    description: 'Storage file key for reference and identification',
    example: 'products/90fa8b21-4f32-45a8-bf2b-5e6f66300001.png',
  })
  fileKey!: string;
}

// ==========================================
// Admin Overview DTOs
// ==========================================

export class InventoryMetricsDto {
  @ApiProperty({
    description: 'Total number of distinct products in catalog',
    example: 54,
  })
  totalProducts!: number;

  @ApiProperty({
    description: 'Number of active products currently listed for sale',
    example: 48,
  })
  activeProducts!: number;

  @ApiProperty({
    description: 'Number of products whose stock is at or below reorderPoint',
    example: 4,
  })
  lowStockProducts!: number;

  @ApiProperty({
    description: 'Number of products with 0 stock',
    example: 2,
  })
  outOfStockProducts!: number;
}

export class AdminOverviewDto {
  @ApiProperty({
    description: 'Total aggregate revenue',
    type: () => MoneyDto,
  })
  revenue!: MoneyDto;

  @ApiProperty({
    description: 'Total count of orders placed',
    example: 142,
  })
  orderCount!: number;

  @ApiProperty({
    description: 'Average order value (revenue / orderCount)',
    type: () => MoneyDto,
  })
  averageOrder!: MoneyDto;

  @ApiProperty({
    description: 'Payment success percentage (paidCount / totalCount * 100)',
    example: 98.5,
  })
  paymentHealth!: number;

  @ApiProperty({
    description: 'Catalog inventory statistics',
    type: () => InventoryMetricsDto,
  })
  inventory!: InventoryMetricsDto;

  @ApiProperty({
    description: 'Products requiring immediate inventory replenishment',
    type: [ProductDto],
  })
  lowStock!: ProductDto[];

  @ApiProperty({
    description: 'Recent orders with pending payment, failure, or cancellation',
    type: [OrderDto],
  })
  exceptions!: OrderDto[];

  @ApiProperty({
    description: 'Historical revenue time series for charts',
    type: 'array',
    items: { type: 'object' },
    example: [],
  })
  revenueSeries!: unknown[];
}
