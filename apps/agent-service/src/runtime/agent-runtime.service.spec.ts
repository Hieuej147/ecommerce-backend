import { ConfigService } from '@nestjs/config';

jest.mock('@copilotkit/runtime/v2', () => ({
  CopilotRuntime: jest.fn().mockImplementation(() => ({})),
  InMemoryAgentRunner: class {},
  createCopilotRuntimeHandler: jest.fn((options: unknown) => {
    capturedOptions = options;
    return mockFetchHandler;
  }),
}));

const mockFetchHandler = jest.fn();
let capturedOptions: unknown;

import { AgentRequestContextService } from '../context/agent-request-context.service';
import { AgentRuntimeService } from './agent-runtime.service';

describe('AgentRuntimeService', () => {
  afterEach(() => jest.restoreAllMocks());

  beforeEach(() => {
    mockFetchHandler.mockReset();
    capturedOptions = undefined;
  });

  it('reports disabled runtime without constructing an upstream handler', async () => {
    const context = new AgentRequestContextService();
    const service = new AgentRuntimeService(
      new ConfigService({
        COPILOT_RUNTIME_ENABLED: false,
        AGENT_ID: 'dashboard',
        AGENT_URL: 'http://127.0.0.1:8001/dashboard-agent',
      }),
      context,
      {} as never,
    );

    service.onModuleInit();
    expect(capturedOptions).toBeUndefined();
    await expect(service.health()).resolves.toEqual({
      runtime: 'disabled',
      mode: 'multi-route',
      agentId: 'dashboard',
      agentConfigured: true,
      upstreamReachable: false,
    });
  });

  it('probes the configured agent URL for readiness', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 200 }));
    const service = new AgentRuntimeService(
      new ConfigService({
        COPILOT_RUNTIME_ENABLED: true,
        AGENT_ID: 'dashboard',
        AGENT_URL: 'http://agent.test/dashboard-agent',
      }),
      new AgentRequestContextService(),
      {} as never,
    );

    service.onModuleInit();
    expect(capturedOptions).toMatchObject({
      basePath: '/v1/api/copilotkit',
    });
    await expect(service.health()).resolves.toMatchObject({
      runtime: 'online',
      mode: 'multi-route',
      agentId: 'dashboard',
      agentConfigured: true,
      upstreamReachable: true,
    });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'http://agent.test/dashboard-agent/health',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('delegates the parsed request to the fetch handler and preserves actor props', async () => {
    let receivedBody: unknown;
    mockFetchHandler.mockImplementation(async (request: globalThis.Request) => {
      receivedBody = await request.json();
      return new Response(null, { status: 204 });
    });

    const context = new AgentRequestContextService();
    const service = new AgentRuntimeService(
      new ConfigService({
        COPILOT_RUNTIME_ENABLED: true,
        AGENT_ID: 'dashboard',
        AGENT_URL: 'http://agent.test/dashboard-agent',
      }),
      context,
      {} as never,
    );
    service.onModuleInit();

    const request = {
      method: 'POST',
      path: '/v1/api/copilotkit/info',
      originalUrl: '/v1/api/copilotkit/info',
      headers: { 'x-request-id': 'request-1' },
      body: { message: 'hello' },
      protocol: 'http',
      get: jest.fn().mockReturnValue('localhost'),
    } as unknown as import('express').Request;
    const response = {
      headersSent: false,
      status: jest.fn().mockReturnThis(),
      setHeader: jest.fn(),
      end: jest.fn(),
      json: jest.fn(),
    } as unknown as import('express').Response;

    await context.run(
      {
        userId: 'user-1',
        role: 'admin',
        authorization: 'Bearer token',
      },
      () => service.handle(request, response),
    );

    expect(receivedBody).toEqual({
      message: 'hello',
      forwardedProps: {
        userId: 'user-1',
        role: 'admin',
        requestId: 'request-1',
      },
    });
  });

  it('returns a typed 503 when the upstream AG-UI agent is unavailable', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockRejectedValue(new Error('connection refused'));
    const service = new AgentRuntimeService(
      new ConfigService({
        COPILOT_RUNTIME_ENABLED: true,
        AGENT_ID: 'dashboard',
        AGENT_URL: 'http://agent.test/dashboard-agent',
      }),
      new AgentRequestContextService(),
      {} as never,
    );
    service.onModuleInit();

    const status = jest.fn().mockReturnThis();
    const json = jest.fn();
    const response = {
      headersSent: false,
      status,
      json,
    } as unknown as import('express').Response;
    const request = {
      path: '/v1/api/copilotkit/agent/dashboard/run',
      originalUrl: '/v1/api/copilotkit/agent/dashboard/run',
      headers: {},
      body: {},
    } as unknown as import('express').Request;

    await service.handle(request, response);

    expect(status).toHaveBeenCalledWith(503);
    expect(json).toHaveBeenCalledWith({
      code: 'AGENT_UNAVAILABLE',
      message: 'The configured AG-UI agent is not reachable',
    });
  });
});
