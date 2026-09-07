import { Client } from 'pg';

async function main() {
  const client = new Client({
    connectionString: 'postgresql://ecommerce:ecommerce@localhost:5438/ecommerce',
  });
  
  await client.connect();
  try {
    const res = await client.query('SELECT * FROM "Product" LIMIT 1');
    console.log(res.rows[0]);
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

main();
