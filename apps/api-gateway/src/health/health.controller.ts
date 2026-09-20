import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Public()
  @Get()
  @ApiOperation({
    summary: 'API Gateway health status',
    description:
      'Public liveness and readiness probe returning operational status of the gateway.',
  })
  @ApiResponse({
    status: 200,
    description: 'Service is healthy and ready to receive traffic',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
      },
    },
  })
  getHealth() {
    return { status: 'ok' };
  }
}
