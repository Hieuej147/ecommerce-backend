import { Injectable, Logger } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getStorageConfig, StorageConfig } from './storage.config';
import { randomUUID } from 'crypto';

export interface PresignedUrlResult {
  uploadUrl: string;
  fileKey: string;
  publicUrl: string;
}

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly s3Client: S3Client;
  private readonly config: StorageConfig;

  constructor() {
    this.config = getStorageConfig();
    this.s3Client = new S3Client({
      endpoint: this.config.endpoint,
      region: this.config.region,
      credentials: {
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey,
      },
      forcePathStyle: this.config.forcePathStyle,
    });
    this.logger.log(
      `Initialized StorageService with driver: ${this.config.driver}, bucket: ${this.config.bucket}`,
    );
  }

  getPublicUrl(fileKey: string): string {
    const cleanKey = fileKey.replace(/^\/+/, '');
    return `${this.config.publicUrl}/${cleanKey}`;
  }

  async createPresignedUploadUrl(params: {
    fileName: string;
    contentType: string;
    folder?: string;
    productId?: string;
    expiresInSeconds?: number;
  }): Promise<PresignedUrlResult> {
    const {
      fileName,
      contentType,
      folder = 'products',
      productId,
      expiresInSeconds = 600,
    } = params;

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'image/gif',
      'image/avif',
    ];
    if (!allowedTypes.includes(contentType.toLowerCase())) {
      throw new Error(
        `Unsupported content type: ${contentType}. Allowed: ${allowedTypes.join(', ')}`,
      );
    }

    const extMatch = fileName.match(/\.([a-zA-Z0-9]+)$/);
    const ext = extMatch ? extMatch[1].toLowerCase() : 'png';
    const uuid = randomUUID();

    const productPrefix = productId ? `${productId}/` : '';
    const cleanFolder = folder.replace(/^\/+|\/+$/g, '');
    const fileKey = `${cleanFolder}/${productPrefix}${uuid}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: this.config.bucket,
      Key: fileKey,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: expiresInSeconds,
    });

    const publicUrl = this.getPublicUrl(fileKey);

    return {
      uploadUrl,
      fileKey,
      publicUrl,
    };
  }

  async uploadBuffer(params: {
    fileKey: string;
    buffer: Buffer;
    contentType: string;
  }): Promise<{ fileKey: string; publicUrl: string }> {
    const { fileKey, buffer, contentType } = params;
    const cleanKey = fileKey.replace(/^\/+/, '');

    const command = new PutObjectCommand({
      Bucket: this.config.bucket,
      Key: cleanKey,
      Body: buffer,
      ContentType: contentType,
    });

    await this.s3Client.send(command);
    return {
      fileKey: cleanKey,
      publicUrl: this.getPublicUrl(cleanKey),
    };
  }

  async deleteFile(fileKey: string): Promise<void> {
    const cleanKey = fileKey.replace(/^\/+/, '');
    const command = new DeleteObjectCommand({
      Bucket: this.config.bucket,
      Key: cleanKey,
    });

    try {
      await this.s3Client.send(command);
    } catch (error) {
      this.logger.warn(
        `Failed to delete file ${cleanKey}: ${(error as Error).message}`,
      );
    }
  }
}
