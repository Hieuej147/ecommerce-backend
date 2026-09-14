export interface StorageConfig {
  driver: 'minio' | 's3' | 'r2';
  endpoint?: string;
  region: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicUrl: string;
  forcePathStyle: boolean;
}

export function getStorageConfig(): StorageConfig {
  const driver = (process.env.STORAGE_DRIVER as 'minio' | 's3' | 'r2') || 'minio';
  const endpoint = process.env.STORAGE_ENDPOINT || 'http://localhost:9002';
  const region = process.env.STORAGE_REGION || 'us-east-1';
  const bucket = process.env.STORAGE_BUCKET || 'ecommerce-products';
  const accessKeyId = process.env.STORAGE_ACCESS_KEY || 'minioadmin';
  const secretAccessKey = process.env.STORAGE_SECRET_KEY || 'minioadmin123';
  const publicUrl = (process.env.STORAGE_PUBLIC_URL || `${endpoint}/${bucket}`).replace(/\/+$/, '');
  const forcePathStyle = process.env.STORAGE_FORCE_PATH_STYLE === 'false' ? false : true;

  return {
    driver,
    endpoint,
    region,
    bucket,
    accessKeyId,
    secretAccessKey,
    publicUrl,
    forcePathStyle,
  };
}
