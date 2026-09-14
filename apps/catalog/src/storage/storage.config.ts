export interface StorageConfig {
  driver: 'minio' | 's3' | 'r2';
  endpoint?: string;
  region: string;
  bucket: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  publicUrl: string;
  forcePathStyle: boolean;
}

export function getStorageConfig(): StorageConfig {
  const driver = (process.env.STORAGE_DRIVER as 'minio' | 's3' | 'r2') || 'minio';
  const isS3 = driver === 's3';

  let endpoint = process.env.STORAGE_ENDPOINT;
  if (!endpoint && !isS3) {
    endpoint = 'http://localhost:9002';
  }

  const region = process.env.STORAGE_REGION || (isS3 ? 'ap-southeast-1' : 'us-east-1');
  const bucket = process.env.STORAGE_BUCKET || 'ecommerce-products';

  let accessKeyId = process.env.STORAGE_ACCESS_KEY;
  let secretAccessKey = process.env.STORAGE_SECRET_KEY;

  if (!accessKeyId && driver === 'minio') {
    accessKeyId = 'minioadmin';
    secretAccessKey = 'minioadmin123';
  }

  let publicUrl = process.env.STORAGE_PUBLIC_URL;
  if (!publicUrl) {
    if (isS3) {
      publicUrl = `https://${bucket}.s3.${region}.amazonaws.com`;
    } else if (endpoint) {
      publicUrl = `${endpoint}/${bucket}`;
    } else {
      publicUrl = `https://${bucket}.r2.cloudflarestorage.com`;
    }
  }
  publicUrl = publicUrl.replace(/\/+$/, '');

  const forcePathStyle = process.env.STORAGE_FORCE_PATH_STYLE !== undefined
    ? process.env.STORAGE_FORCE_PATH_STYLE === 'true'
    : !isS3;

  return {
    driver,
    endpoint: endpoint || undefined,
    region,
    bucket,
    accessKeyId: accessKeyId || undefined,
    secretAccessKey: secretAccessKey || undefined,
    publicUrl,
    forcePathStyle,
  };
}
