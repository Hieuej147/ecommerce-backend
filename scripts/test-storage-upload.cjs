require('dotenv/config');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const endpoint = process.env.STORAGE_ENDPOINT || 'http://localhost:9002';
const region = process.env.STORAGE_REGION || 'us-east-1';
const bucket = process.env.STORAGE_BUCKET || 'ecommerce-products';
const accessKeyId = process.env.STORAGE_ACCESS_KEY || 'minioadmin';
const secretAccessKey = process.env.STORAGE_SECRET_KEY || 'minioadmin123';
const publicUrl = (process.env.STORAGE_PUBLIC_URL || `${endpoint}/${bucket}`).replace(/\/+$/, '');
const forcePathStyle = process.env.STORAGE_FORCE_PATH_STYLE === 'false' ? false : true;

const s3 = new S3Client({
  endpoint,
  region,
  credentials: { accessKeyId, secretAccessKey },
  forcePathStyle,
});

async function runTest() {
  console.log('--- TEST 1: Generate Presigned URL ---');
  const testKey = `test-uploads/test-${Date.now()}.png`;
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: testKey,
    ContentType: 'image/png',
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
  console.log('Presigned Upload URL successfully created:');
  console.log(uploadUrl);

  console.log('\n--- TEST 2: Perform Direct HTTP PUT to Presigned URL ---');
  // Dummy 1x1 transparent PNG buffer
  const dummyPng = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    'base64',
  );

  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'image/png',
    },
    body: dummyPng,
  });

  console.log(`PUT status: ${response.status} ${response.statusText}`);
  if (!response.ok) {
    throw new Error(`Direct PUT failed with status ${response.status}`);
  }

  console.log('\n--- TEST 3: Verify Public Read via HTTP GET ---');
  const filePublicUrl = `${publicUrl}/${testKey}`;
  const getResponse = await fetch(filePublicUrl);
  console.log(`GET ${filePublicUrl} status: ${getResponse.status} ${getResponse.statusText}`);
  if (!getResponse.ok) {
    throw new Error(`GET public URL failed with status ${getResponse.status}`);
  }

  console.log('\n✓ ALL STORAGE VERIFICATION TESTS PASSED SUCCESSFULLY!');
}

runTest().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
