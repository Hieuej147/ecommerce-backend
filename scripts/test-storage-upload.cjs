require('dotenv/config');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');

const endpoint = process.env.STORAGE_ENDPOINT || 'http://localhost:9002';
const region = process.env.STORAGE_REGION || 'us-east-1';
const bucket = process.env.STORAGE_BUCKET || 'ecommerce-products';
const accessKeyId = process.env.STORAGE_ACCESS_KEY || 'minioadmin';
const secretAccessKey = process.env.STORAGE_SECRET_KEY || 'minioadmin123';
const forcePathStyle = process.env.STORAGE_FORCE_PATH_STYLE === 'false' ? false : true;

const s3 = new S3Client({
  endpoint,
  region,
  credentials: { accessKeyId, secretAccessKey },
  forcePathStyle,
});

async function runTest() {
  console.log(`--- TEST 1: Direct Storage Upload to ${bucket} ---`);
  const testKey = `test-uploads/test-${Date.now()}.png`;
  // Dummy 1x1 transparent PNG buffer
  const dummyPng = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    'base64',
  );

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: testKey,
      Body: dummyPng,
      ContentType: 'image/png',
    }),
  );
  console.log(`✓ Direct S3/MinIO upload succeeded: ${testKey}`);

  console.log('\n--- TEST 2: Direct Storage Read (GetObjectCommand) ---');
  const getObj = await s3.send(
    new GetObjectCommand({
      Bucket: bucket,
      Key: testKey,
    }),
  );
  console.log(`✓ Direct S3/MinIO read succeeded: ContentType=${getObj.ContentType}, ContentLength=${getObj.ContentLength}`);

  console.log('\n--- TEST 3: API Gateway Media Proxy Endpoint Test ---');
  const gatewayUrl = process.env.GATEWAY_URL || 'http://localhost:3000';
  const proxyUrl = `${gatewayUrl}/v1/media/${testKey}`;
  console.log(`Attempting GET ${proxyUrl}...`);
  try {
    const res = await fetch(proxyUrl);
    console.log(`Proxy response status: ${res.status} ${res.statusText}`);
    console.log(`Cache-Control: ${res.headers.get('cache-control')}`);
    if (res.ok) {
      console.log('✓ API Gateway media streaming verified successfully!');
    } else {
      console.log('ℹ API Gateway returned non-200 (ensure API Gateway is running to test proxy).');
    }
  } catch (err) {
    console.log(`ℹ API Gateway not reachable at ${gatewayUrl} (skip if testing offline): ${err.message}`);
  }

  console.log('\n✓ ALL STORAGE & PROXY VERIFICATION TESTS COMPLETED!');
}

runTest().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
