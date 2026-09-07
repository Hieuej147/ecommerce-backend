import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAgent } from '@ag-ui/client';
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from '@copilotkit/runtime/v2';
import type { Request, Response } from 'express';
import { once } from 'node:events';
import { Readable } from 'node:stream';
import type { ReadableStream as NodeReadableStream } from 'node:stream/web';
import { AgentRequestContextService } from '../context/agent-request-context.service';
import { PersistedAgentRunner } from '../runner/persisted-agent.runner';

interface RuntimeHealth {
  runtime: 'online' | 'disabled';
  mode: 'multi-route';
  agentId: string;
  agentConfigured: boolean;
  upstreamReachable: boolean;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Nest adapter for the self-managed CopilotKit multi-route runtime. */
@Injectable()
export class AgentRuntimeService implements OnModuleInit {
  private multiRouteHandler?: (
    request: globalThis.Request,
  ) => Promise<globalThis.Response>;
  private singleRouteHandler?: (
    request: globalThis.Request,
  ) => Promise<globalThis.Response>;
  private enabled = true;

  constructor(
    private readonly config: ConfigService,
    private readonly requestContext: AgentRequestContextService,
    private readonly runner: PersistedAgentRunner,
  ) {}

  onModuleInit(): void {
    this.enabled = this.config.get<boolean>('COPILOT_RUNTIME_ENABLED') ?? true;
    if (!this.enabled) return;

    const agentId = this.config.get<string>('AGENT_ID') ?? 'dashboard';
    const agentUrl = this.config.getOrThrow<string>('AGENT_URL');
    const agent = new HttpAgent({
      agentId,
      url: agentUrl,
      fetch: async (url, init) => {
        const context = this.requestContext.get();
        const headers = new Headers(init?.headers);
        if (context?.authorization) {
          headers.set('authorization', context.authorization);
        }
        headers.set('x-user-id', context?.userId ?? 'unknown');
        headers.set('x-user-role', context?.role ?? 'customer');
        return fetch(url, { ...init, headers });
      },
    });

    const runtime = new CopilotRuntime({
      agents: { [agentId]: agent },
      runner: this.runner,
      // The event store already preserves ACTIVITY_SNAPSHOT. Enable the
      // CopilotKit middleware later when a concrete A2UI catalog is registered.
      a2ui: {},
    });

    // Support both multi-route and single-route transparently
    this.multiRouteHandler = createCopilotRuntimeHandler({
      runtime,
      basePath: '/v1/api/copilotkit',
      mode: 'multi-route',
    });

    this.singleRouteHandler = createCopilotRuntimeHandler({
      runtime,
      basePath: '/v1/api/copilotkit',
      mode: 'single-route',
    });
  }

  async health(): Promise<RuntimeHealth> {
    const agentId = this.config.get<string>('AGENT_ID') ?? 'dashboard';
    const agentUrl = this.config.get<string>('AGENT_URL');
    const upstreamReachable =
      this.enabled && agentUrl ? await this.probeUpstream(agentUrl) : false;
    return {
      runtime: this.enabled ? 'online' : 'disabled',
      mode: 'multi-route',
      agentId,
      agentConfigured: Boolean(agentUrl),
      upstreamReachable,
    };
  }

  async handle(request: Request, response: Response): Promise<void> {
    if (!this.enabled || !this.multiRouteHandler || !this.singleRouteHandler) {
      response.status(503).json({
        code: 'COPILOT_RUNTIME_DISABLED',
        message: 'CopilotKit runtime is disabled',
      });
      return;
    }

    const pathname = request.path ?? request.originalUrl;
    const rawBody: unknown = request.body;
    const isSingleRoute =
      isRecord(rawBody) && typeof rawBody.method === 'string';

    const isRunOrConnect =
      /\/(run|connect)(?:\/|$)/u.test(pathname) ||
      (isSingleRoute &&
        (rawBody.method === 'agent/run' || rawBody.method === 'agent/connect'));

    if (isRunOrConnect) {
      const agentUrl = this.config.getOrThrow<string>('AGENT_URL');
      if (!(await this.probeUpstream(agentUrl))) {
        response.status(503).json({
          code: 'AGENT_UNAVAILABLE',
          message: 'The configured AG-UI agent is not reachable',
        });
        return;
      }
    }

    const context = this.requestContext.get();
    const forwardedProps = {
      userId: context?.userId,
      role: context?.role,
      requestId: request.headers['x-request-id'],
    };

    if (isRecord(rawBody)) {
      if (isSingleRoute && isRecord(rawBody.body)) {
        rawBody.body = {
          ...rawBody.body,
          forwardedProps: {
            ...(isRecord(rawBody.body.forwardedProps)
              ? rawBody.body.forwardedProps
              : {}),
            ...forwardedProps,
          },
        };
      }

      request.body = {
        ...rawBody,
        forwardedProps: {
          ...(isRecord(rawBody.forwardedProps) ? rawBody.forwardedProps : {}),
          ...forwardedProps,
        },
      };
    }

    const handler = isSingleRoute
      ? this.singleRouteHandler
      : this.multiRouteHandler;

    try {
      await this.invokeFetchHandler(request, response, handler);
    } catch (error) {
      if (!response.headersSent) {
        response.status(502).json({
          code: 'COPILOT_RUNTIME_UPSTREAM_ERROR',
          message: error instanceof Error ? error.message : String(error),
        });
      } else {
        response.end();
      }
    }
  }

  private async invokeFetchHandler(
    request: Request,
    response: Response,
    handler: (request: globalThis.Request) => Promise<globalThis.Response>,
  ): Promise<void> {
    const headers = new Headers();
    for (const [name, value] of Object.entries(request.headers)) {
      if (value === undefined || name === 'host' || name === 'content-length') {
        continue;
      }
      headers.set(name, Array.isArray(value) ? value.join(',') : value);
    }

    const method = request.method.toUpperCase();
    const body =
      method === 'GET' || method === 'HEAD'
        ? undefined
        : typeof request.body === 'string'
          ? request.body
          : JSON.stringify(request.body ?? {});
    const url = new URL(
      request.originalUrl,
      `${request.protocol}://${request.get('host') ?? 'localhost'}`,
    );
    const webRequest = new globalThis.Request(url, {
      method,
      headers,
      body,
      duplex: 'half',
    } as RequestInit & { duplex: 'half' });
    const webResponse = await handler(webRequest);

    response.status(webResponse.status);
    webResponse.headers.forEach((value, name) => {
      if (
        !['content-length', 'content-encoding', 'transfer-encoding'].includes(
          name,
        )
      ) {
        response.setHeader(name, value);
      }
    });
    response.setHeader('x-accel-buffering', 'no');
    if (!webResponse.body) {
      response.end();
      return;
    }

    try {
      Readable.fromWeb(
        webResponse.body as unknown as NodeReadableStream,
      ).pipe(response);
      await once(response, 'finish');
    } catch (error) {
      if (!response.destroyed) response.destroy(error as Error);
    }
  }

  private async probeUpstream(agentUrl: string): Promise<boolean> {
    const baseUrl = agentUrl.replace(/\/$/u, '');
    // ag-ui-langgraph exposes /health, while other AG-UI servers commonly
    // expose /info. Support both without making either adapter special.
    for (const endpoint of ['health', 'info']) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1500);
      try {
        const response = await fetch(`${baseUrl}/${endpoint}`, {
          method: 'GET',
          signal: controller.signal,
        });
        if (response.ok) return true;
      } catch {
        // Try the next health endpoint.
      } finally {
        clearTimeout(timeout);
      }
    }
    return false;
  }
}
