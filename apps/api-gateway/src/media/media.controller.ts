import {
  Controller,
  Post,
  Get,
  Req,
  Res,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { StorageService } from '../storage/storage.service';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
]);

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload an image file directly to storage' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Image uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string', example: '/v1/media/products/uuid.png' },
        fileKey: { type: 'string', example: 'products/uuid.png' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
      fileFilter: (_req, file, callback) => {
        if (!ALLOWED_MIME_TYPES.has(file.mimetype.toLowerCase())) {
          return callback(
            new BadRequestException(
              `Unsupported file type: ${file.mimetype}. Allowed types: ${Array.from(ALLOWED_MIME_TYPES).join(', ')}`,
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder = 'products',
  ) {
    if (!file) {
      throw new BadRequestException('No file provided in form-data ("file" field is required)');
    }

    const cleanFolder = (folder || 'products').replace(/[^a-zA-Z0-9_-]/g, '') || 'products';
    const extMatch = file.originalname?.match(/\.([a-zA-Z0-9]+)$/);
    const ext = extMatch ? `.${extMatch[1].toLowerCase()}` : '.png';
    const fileKey = `${cleanFolder}/${randomUUID()}${ext}`;

    const result = await this.storageService.uploadBuffer({
      fileKey,
      buffer: file.buffer,
      contentType: file.mimetype,
    });

    return {
      url: result.url,
      fileKey: result.fileKey,
    };
  }

  @Get('*fileKey')
  @ApiOperation({ summary: 'Stream an image file with caching headers' })
  async serveFile(@Req() req: Request, @Res() res: Response) {
    const rawKey = req.params?.fileKey;
    const fileKey = Array.isArray(rawKey) ? rawKey.join('/') : String(rawKey || '');

    if (!fileKey || fileKey.includes('..')) {
      throw new BadRequestException('Invalid media file key');
    }

    const { stream, contentType, contentLength, etag } =
      await this.storageService.getFileStream(fileKey);

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    if (contentLength) {
      res.setHeader('Content-Length', contentLength);
    }
    if (etag) {
      res.setHeader('ETag', etag);
    }

    stream.on('error', (err) => {
      if (!res.headersSent) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
      }
    });

    stream.pipe(res);
  }
}
