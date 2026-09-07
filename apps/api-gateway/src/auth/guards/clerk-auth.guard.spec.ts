/// <reference types="jest" />

import { getAuth } from '@clerk/express';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../auth.constants';
import { ClerkAuthGuard } from './clerk-auth.guard';

jest.mock('@clerk/express', () => ({
  getAuth: jest.fn(),
}));

const mockedGetAuth = jest.mocked(getAuth);

function createContext(
  handler: () => unknown = () => undefined,
): ExecutionContext {
  const request = {
    header: jest.fn().mockReturnValue(undefined),
  };

  const context = {
    getHandler: () => handler,
    getClass: () => class TestController {},
    switchToHttp: () => ({
      getRequest: () => request,
      getResponse: () => ({}),
      getNext: () => undefined,
    }),
  };

  return context as unknown as ExecutionContext;
}

describe('ClerkAuthGuard', () => {
  let guard: ClerkAuthGuard;

  beforeEach(() => {
    jest.clearAllMocks();
    guard = new ClerkAuthGuard(new Reflector(), { get: jest.fn() } as any);
  });

  it('allows a route marked public without consulting Clerk', () => {
    const handler = () => undefined;
    Reflect.defineMetadata(IS_PUBLIC_KEY, true, handler);

    expect(guard.canActivate(createContext(handler))).toBe(true);
    expect(mockedGetAuth).not.toHaveBeenCalled();
  });

  it('rejects a request without a Clerk user', () => {
    mockedGetAuth.mockReturnValue({ userId: null } as ReturnType<
      typeof getAuth
    >);

    expect(() => guard.canActivate(createContext())).toThrow(
      new UnauthorizedException('A valid Clerk session is required'),
    );
  });

  it('allows a request with a Clerk user', () => {
    mockedGetAuth.mockReturnValue({ userId: 'user_test' } as ReturnType<
      typeof getAuth
    >);

    expect(guard.canActivate(createContext())).toBe(true);
  });
});
