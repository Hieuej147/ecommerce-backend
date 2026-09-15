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
  const bucket = process.env.STORAGE_BUCKET || 'prod-ecommerce-media-assets';

  let accessKeyId = process.env.STORAGE_ACCESS_KEY || process.env.AWS_ACCESS_KEY_ID;
  let secretAccessKey = process.env.STORAGE_SECRET_KEY || process.env.AWS_SECRET_ACCESS_KEY;

  if (!accessKeyId && driver === 'minio') {
    accessKeyId = 'minioadmin';
    secretAccessKey = 'minioadmin123';
  }

  let publicUrl = process.env.STORAGE_PUBLIC_URL || '/v1/media';
  publicUrl = publicUrl.replace(/\/+$/, '');

  const forcePathStyle =
    process.env.STORAGE_FORCE_PATH_STYLE !== undefined
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
