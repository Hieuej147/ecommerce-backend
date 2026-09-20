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
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { StorageService } from '../storage/storage.service';
import { Public } from '../auth/decorators/public.decorator';
import { UploadMediaResponseDto, ErrorResponseDto } from '../swagger/dtos';

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
  @ApiOperation({
    summary: 'Upload an image file directly to storage',
    description:
      'Uploads an image file using multipart/form-data. Supported image types: JPEG, PNG, WEBP, GIF, SVG, AVIF (max 10MB). Returns the public media URL and storage key.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({
    name: 'folder',
    required: false,
    type: String,
    description: 'Target storage directory (defaults to "products")',
    example: 'products',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file to upload (JPEG, PNG, WEBP, GIF, SVG, AVIF)',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UploadMediaResponseDto,
    description: 'Image uploaded successfully',
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponseDto,
    description: 'No file provided or unsupported file format',
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
      throw new BadRequestException(
        'No file provided in form-data ("file" field is required)',
      );
    }

    const cleanFolder =
      (folder || 'products').replace(/[^a-zA-Z0-9_-]/g, '') || 'products';
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

  @Public()
  @Get('*fileKey')
  @ApiOperation({
    summary: 'Stream an image file with caching headers',
    description:
      'Public endpoint to fetch and stream images with 1-year immutable Cache-Control and ETag headers.',
  })
  @ApiParam({
    name: 'fileKey',
    type: String,
    description: 'Relative storage path key of the media file',
    example: 'products/uuid.png',
  })
  @ApiResponse({
    status: 200,
    description: 'Binary image stream with appropriate Content-Type',
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponseDto,
    description: 'Invalid file key path',
  })
  @ApiResponse({
    status: 404,
    type: ErrorResponseDto,
    description: 'Media file not found in storage',
  })
  async serveFile(@Req() req: Request, @Res() res: Response) {
    const rawKey = req.params?.fileKey;
    const fileKey = Array.isArray(rawKey)
      ? rawKey.join('/')
      : String(rawKey || '');

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

    stream.on('error', (_err) => {
      if (!res.headersSent) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
      }
    });

    stream.pipe(res);
  }
}
