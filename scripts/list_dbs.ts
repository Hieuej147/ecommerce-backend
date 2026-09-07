import { Client } from 'pg';

async function main() {
  const client = new Client({
    connectionString: 'postgresql://ecommerce:ecommerce@localhost:5438/postgres',
  });
  
  await client.connect();
  try {
    const res = await client.query('SELECT datname FROM pg_database');
    console.log(res.rows.map(r => r.datname));
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

main();
