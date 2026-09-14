require('dotenv/config');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

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

const sourceDir = path.resolve('/mnt/disk3/E-commerce/public/products');

async function uploadDemoImages() {
  console.log(`Starting demo image upload to ${bucket}...`);
  if (!fs.existsSync(sourceDir)) {
    console.error(`Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(sourceDir).filter((f) => f.endsWith('.png'));
  console.log(`Found ${files.length} images in ${sourceDir}`);

  for (const file of files) {
    const filePath = path.join(sourceDir, file);
    const fileBuffer = fs.readFileSync(filePath);
    const key = `demo/${file}`;

    console.log(`Uploading ${file} -> ${key}...`);
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: fileBuffer,
        ContentType: 'image/png',
      }),
    );
    console.log(`✓ Uploaded ${file} -> ${publicUrl}/${key}`);
  }

  console.log('\nAll demo images uploaded successfully to Storage bucket!');
}

uploadDemoImages().catch((err) => {
  console.error('Upload failed:', err);
  process.exit(1);
});
