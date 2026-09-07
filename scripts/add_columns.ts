import { Client } from 'pg';

async function main() {
  const client = new Client({
    connectionString: 'postgresql://ecommerce:ecommerce@localhost:5438/ecommerce',
  });
  
  await client.connect();
  try {
    await client.query(`ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "colors" TEXT[] DEFAULT ARRAY[]::TEXT[]`);
    await client.query(`ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "sizes" TEXT[] DEFAULT ARRAY[]::TEXT[]`);
    console.log('Columns added successfully');
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

main();
