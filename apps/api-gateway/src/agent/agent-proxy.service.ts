import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { once } from 'node:events';
import type { ActorContext } from '../auth/types/actor-context';

const REQUEST_HEADERS_TO_DROP = new Set([
  'host',
  'connection',
  'content-length',
  'cookie',
  'accept-encoding',
]);
const RESPONSE_HEADERS_TO_DROP = new Set([
  'connection',
  'content-length',
  'content-encoding',
  'transfer-encoding',
]);

@Injectable()
export class AgentProxyService {
  constructor(private readonly config: ConfigService) {}

  async forward(
    request: Request,
    response: Response,
    actor: ActorContext,
  ): Promise<void> {
    const baseUrl = this.config.getOrThrow<string>('AGENT_SERVICE_URL');
    const target = new URL(request.originalUrl, baseUrl);
    const controller = new AbortController();
    request.once('aborted', () => controller.abort());

    const headers = this.createHeaders(request, actor);
    const method = request.method.toUpperCase();
    const hasBody = method !== 'GET' && method !== 'HEAD';
    const body = hasBody ? this.serializeBody(request.body, headers) : undefined;

    let upstream: globalThis.Response;
    try {
      upstream = await fetch(target, {
        method,
        headers,
        body,
        signal: controller.signal,
      });
    } catch (error) {
      if (!response.headersSent) {
        response.status(502).json({
          code: 'AGENT_SERVICE_UNAVAILABLE',
          message: error instanceof Error ? error.message : String(error),
        });
      }
      return;
    }

    response.status(upstream.status);
    upstream.headers.forEach((value, name) => {
      if (!RESPONSE_HEADERS_TO_DROP.has(name.toLowerCase())) {
        response.setHeader(name, value);
      }
    });
    response.setHeader('x-accel-buffering', 'no');

    if (!upstream.body) {
      response.end();
      return;
    }

    try {
      for await (const chunk of upstream.body) {
        if (!response.write(Buffer.from(chunk))) await once(response, 'drain');
      }
      response.end();
    } catch (error) {
      if (!response.destroyed) response.destroy(error as Error);
    }
  }

  private createHeaders(request: Request, actor: ActorContext): Headers {
    const headers = new Headers();
    for (const [name, value] of Object.entries(request.headers)) {
      if (REQUEST_HEADERS_TO_DROP.has(name.toLowerCase()) || value === undefined) {
        continue;
      }
      headers.set(name, Array.isArray(value) ? value.join(',') : value);
    }
    headers.set(
      'x-internal-service-token',
      this.config.getOrThrow<string>('AGENT_INTERNAL_TOKEN'),
    );
    headers.set('x-user-id', actor.userId);
    headers.set('x-user-role', actor.role);
    headers.set('x-request-id', actor.requestId);
    return headers;
  }

  private serializeBody(body: unknown, headers: Headers): BodyInit | undefined {
    if (body === undefined || body === null) return undefined;
    if (Buffer.isBuffer(body)) return new Uint8Array(body);
    if (typeof body === 'string') return body;
    headers.set('content-type', 'application/json');
    return JSON.stringify(body);
  }
}
