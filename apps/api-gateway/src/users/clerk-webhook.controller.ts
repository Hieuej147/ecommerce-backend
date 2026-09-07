import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { verifyWebhook } from '@clerk/express/webhooks';
import type { WebhookEvent } from '@clerk/express/webhooks';
import { Public } from '../auth/decorators/public.decorator';
import type { AuthenticatedRequest } from '../auth/types/authenticated-request';
import { UsersGrpcService } from './users.grpc.service';
import { InngestEventsService } from '../inngest/inngest.client';

@Controller('webhooks/clerk')
export class ClerkWebhookController {
  constructor(
    private readonly users: UsersGrpcService,
    private readonly inngest: InngestEventsService,
  ) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(@Req() request: AuthenticatedRequest) {
    const eventId = request.header('svix-id');
    if (!eventId) throw new BadRequestException('Missing svix-id header');

    const parsedBody = request.body;
    if (request.rawBody) request.body = request.rawBody;
    let event: WebhookEvent;
    try {
      event = await verifyWebhook(request);
    } catch {
      throw new BadRequestException('Invalid Clerk webhook signature');
    } finally {
      request.body = parsedBody;
    }

    if (event.type === 'user.deleted') {
      if (!event.data.id) return { received: true, ignored: true };
      await this.users.remove({
        eventId,
        clerkId: event.data.id,
        payloadJson: JSON.stringify(event.data),
      });
      return { received: true };
    }

    if (event.type !== 'user.created' && event.type !== 'user.updated') {
      return { received: true, ignored: true };
    }

    const user = event.data;
    const primaryEmail = user.email_addresses.find(
      (email) => email.id === user.primary_email_address_id,
    );
    const displayName =
      [user.first_name, user.last_name].filter(Boolean).join(' ').trim() ||
      user.username ||
      primaryEmail?.email_address ||
      user.id;
    await this.users.upsert({
      eventId,
      eventType: event.type,
      clerkId: user.id,
      email: primaryEmail?.email_address ?? '',
      firstName: user.first_name ?? '',
      lastName: user.last_name ?? '',
      displayName,
      imageUrl: user.image_url,
      role: user.public_metadata.role === 'admin' ? 'admin' : 'customer',
      payloadJson: JSON.stringify(user),
      clerkCreatedAt: user.created_at
        ? new Date(user.created_at).toISOString()
        : '',
    });
    if (event.type === 'user.created') {
      void this.inngest.userCreated({
        userId: user.id,
        email: primaryEmail?.email_address ?? '',
        displayName,
      });
    }
    return { received: true };
  }
}
