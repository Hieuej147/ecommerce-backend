require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is required');
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

const base = [
  ['Classic Core Tee', 'Tees', 590000, 'NEW'],
  ['Urban Cargo Pants', 'Pants', 1190000, 'BEST SELLER'],
  ['Studio Runner', 'Shoes', 1890000, 'SALE'],
  ['Everyday Overshirt', 'Outerwear', 1490000, 'NEW'],
  ['Essential Knit', 'Knitwear', 990000, ''],
  ['Varsity Layer', 'Outerwear', 1690000, 'SALE'],
  ['Canvas Low Cap', 'Accessories', 450000, ''],
  ['Transit Backpack', 'Accessories', 1290000, 'BEST SELLER'],
  ['Relaxed Logo Tee', 'Tees', 650000, ''],
  ['Night Shift Hoodie', 'Outerwear', 1390000, 'LOW STOCK'],
  ['Daily Court Sneaker', 'Shoes', 1790000, ''],
  ['Mini Crossbody', 'Accessories', 720000, 'NEW'],
];
const tones = ['#e9e3d3', '#dce6e2', '#e1d8f5', '#f5d9c3'];
const customers = ['Nguyễn Minh Anh', 'Trần Quốc Bảo', 'Lê Hoàng Yến', 'Phạm Gia Huy', 'Võ Khánh Linh', 'Đỗ Nhật Nam', 'Bùi Thanh Hà', 'Hoàng Gia Khang', 'Mai Thảo Vy', 'Ngô Đức Anh', 'Phan Ngọc Mai', 'Đặng Khôi'];
const cities = ['Hồ Chí Minh', 'Đà Nẵng', 'Hà Nội', 'Cần Thơ', 'Hải Phòng'];

const colorMapping = [
  { colors: ['#000000', '#FFFFFF', '#FFC0CB'], images: { '#000000': '/products/1g.png', '#FFFFFF': '/products/1gr.png', '#FFC0CB': '/products/1p.png' } },
  { colors: ['#000000', '#FFFFFF'], images: { '#000000': '/products/2g.png', '#FFFFFF': '/products/2gr.png' } },
  { colors: ['#0000FF', '#000000', '#808080'], images: { '#0000FF': '/products/3bl.png', '#000000': '/products/3b.png', '#808080': '/products/3gr.png' } },
  { colors: ['#FFC0CB', '#FFFFFF'], images: { '#FFC0CB': '/products/4p.png', '#FFFFFF': '/products/4w.png' } },
  { colors: ['#0000FF', '#FFA500', '#FF0000'], images: { '#0000FF': '/products/5bl.png', '#FFA500': '/products/5o.png', '#FF0000': '/products/5r.png' } },
  { colors: ['#008000', '#FFFFFF'], images: { '#008000': '/products/6g.png', '#FFFFFF': '/products/6w.png' } },
  { colors: ['#008000', '#FFC0CB'], images: { '#008000': '/products/7g.png', '#FFC0CB': '/products/7p.png' } },
  { colors: ['#000000', '#808080'], images: { '#000000': '/products/8b.png', '#808080': '/products/8gr.png' } },
];
const PRODUCT_COUNT = 100;

async function main() {
  const products = [];
  for (let i = 0; i < PRODUCT_COUNT; i += 1) {
    const [name, category, price, badge] = base[i % base.length];
    const number = String(i + 1).padStart(2, '0');
    const colorInfo = colorMapping[i % 8];
    const product = await prisma.product.upsert({
      where: { externalId: `ui-product-${number}` },
      create: {
        externalId: `ui-product-${number}`,
        sku: `NMD-${String(100 + i).padStart(3, '0')}`,
        slug: `${name.toLowerCase().replaceAll(' ', '-')}-${number}`,
        name: i < 12 ? name : `${name} / ${['Sand', 'Ink', 'Moss', 'Cherry'][i % 4]}`,
        categorySlug: category.toLowerCase(),
        description: 'Phom dáng thoải mái, chất liệu mềm và đủ bền cho mọi lịch trình.',
        colors: colorInfo.colors,
        sizes: ['S', 'M', 'L', 'XL'],
        images: colorInfo.images,
        reorderPoint: 20,
        priceAmountMinor: BigInt(price),
        currency: 'VND',
        stockQuantity: [84, 32, 18, 7, 46, 12, 55, 26, 9, 4, 38, 21][i % 12],
      },
      update: {
        sku: `NMD-${String(100 + i).padStart(3, '0')}`,
        name: i < 12 ? name : `${name} / ${['Sand', 'Ink', 'Moss', 'Cherry'][i % 4]}`,
        categorySlug: category.toLowerCase(),
        priceAmountMinor: BigInt(price),
        currency: 'VND',
        stockQuantity: [84, 32, 18, 7, 46, 12, 55, 26, 9, 4, 38, 21][i % 12],
        colors: colorInfo.colors,
        sizes: ['S', 'M', 'L', 'XL'],
        images: colorInfo.images,
      },
    });
    products.push(product);
  }

  const userId = process.env.DEMO_USER_ID || 'demo-user-001';
  for (let i = 0; i < 72; i += 1) {
    const product = products[i % products.length];
    const quantity = (i % 4) + 1;
    const total = BigInt(product.priceAmountMinor) * BigInt(quantity);
    const status = i % 17 === 0 ? 'PAYMENT_FAILED' : i % 13 === 0 ? 'CANCELLED' : i % 7 === 0 ? 'PENDING_PAYMENT' : 'PAID';
    const paymentStatus = status === 'PAID' ? 'PAID' : status === 'PAYMENT_FAILED' ? 'FAILED' : 'UNPAID';
    await prisma.order.upsert({
      where: { externalId: `ui-order-${String(i + 1).padStart(3, '0')}` },
      create: {
        externalId: `ui-order-${String(i + 1).padStart(3, '0')}`,
        userId,
        customerName: customers[i % customers.length],
        customerEmail: `demo-${String((i % 24) + 1).padStart(2, '0')}@example.test`,
        status,
        paymentStatus,
        subtotalAmountMinor: total,
        totalAmountMinor: total,
        currency: 'VND',
        recipientName: customers[i % customers.length],
        phone: '0900000000',
        line1: 'Demo address',
        city: cities[i % cities.length],
        countryCode: 'VN',
        idempotencyKey: `seed-${i + 1}`,
        items: { create: [{ productId: product.id, productName: product.name, quantity, unitPriceAmountMinor: product.priceAmountMinor, lineTotalAmountMinor: total }] },
      },
      update: { status, paymentStatus, totalAmountMinor: total, customerName: customers[i % customers.length] },
    });
    const order = await prisma.order.findUnique({ where: { externalId: `ui-order-${String(i + 1).padStart(3, '0')}` } });
    if (order) {
      const providerStatus = paymentStatus === 'PAID' ? 'PAID' : paymentStatus === 'FAILED' ? 'FAILED' : 'CREATED';
      await prisma.payment.upsert({
        where: { orderId: order.id },
        create: { orderId: order.id, userId, amountMinor: total, currency: 'VND', provider: 'stripe', status: providerStatus },
        update: { userId, amountMinor: total, currency: 'VND', status: providerStatus },
      });
    }
  }
  console.log(JSON.stringify({ products: products.length, orders: 72, userId }));
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
