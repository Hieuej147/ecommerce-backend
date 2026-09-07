import { All, Controller, Req, Res } from '@nestjs/common';
import { serve } from 'inngest/express';
import type { Request, Response } from 'express';
import {
  inngest,
  lowStockFunction,
  orderCreatedFunction,
  paymentStatusFunction,
  welcomeUserFunction,
} from './inngest.client';
import { Public } from '../auth/decorators/public.decorator';

const handler = serve({
  client: inngest,
  functions: [welcomeUserFunction, orderCreatedFunction, paymentStatusFunction, lowStockFunction],
  serveOrigin: process.env.INNGEST_SERVE_ORIGIN || 'http://localhost:3000/v1/inngest',
});

@Controller('inngest')
export class InngestController {
  @Public()
  @All(['', '*'])
  handle(@Req() request: Request, @Res() response: Response) {
    return handler(request, response);
  }
}
