import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { getStorageConfig, StorageConfig } from './storage.config';

export interface FileStreamResult {
  stream: Readable;
  contentType: string;
  contentLength?: number;
  etag?: string;
}

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly s3Client: S3Client;
  private readonly config: StorageConfig;

  constructor() {
    this.config = getStorageConfig();
    const clientConfig: any = {
      region: this.config.region,
      forcePathStyle: this.config.forcePathStyle,
    };
    if (this.config.endpoint) {
      clientConfig.endpoint = this.config.endpoint;
    }
    if (this.config.accessKeyId && this.config.secretAccessKey) {
      clientConfig.credentials = {
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey,
      };
    }
    this.s3Client = new S3Client(clientConfig);
    this.logger.log(
      `Initialized StorageService with driver: ${this.config.driver}, bucket: ${this.config.bucket}`,
    );
  }

  getPublicUrl(fileKey: string): string {
    const cleanKey = fileKey.replace(/^\/+/, '');
    if (this.config.publicUrl.startsWith('http')) {
      return `${this.config.publicUrl}/${cleanKey}`;
    }
    return `/v1/media/${cleanKey}`;
  }

  async uploadBuffer(params: {
    fileKey: string;
    buffer: Buffer;
    contentType: string;
  }): Promise<{ fileKey: string; url: string }> {
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
      url: this.getPublicUrl(cleanKey),
    };
  }

  async getFileStream(fileKey: string): Promise<FileStreamResult> {
    const cleanKey = fileKey.replace(/^\/+/, '');
    try {
      const command = new GetObjectCommand({
        Bucket: this.config.bucket,
        Key: cleanKey,
      });

      const response = await this.s3Client.send(command);

      if (!response.Body) {
        throw new NotFoundException(`File ${cleanKey} has empty body`);
      }

      return {
        stream: response.Body as Readable,
        contentType: response.ContentType || 'application/octet-stream',
        contentLength: response.ContentLength,
        etag: response.ETag,
      };
    } catch (error: any) {
      if (error?.name === 'NoSuchKey' || error?.$metadata?.httpStatusCode === 404) {
        throw new NotFoundException(`Media file not found: ${cleanKey}`);
      }
      this.logger.error(`Failed to get stream for ${cleanKey}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async deleteFile(fileKey: string): Promise<void> {
    const cleanKey = fileKey.replace(/^\/+/, '');
    const command = new DeleteObjectCommand({
      Bucket: this.config.bucket,
      Key: cleanKey,
    });

    try {
      await this.s3Client.send(command);
    } catch (error: any) {
      this.logger.warn(`Failed to delete file ${cleanKey}: ${error.message}`);
    }
  }
}
