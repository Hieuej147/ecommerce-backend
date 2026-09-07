import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';

export interface AgentRequestContextValue {
  userId: string;
  role: 'customer' | 'admin';
  authorization?: string;
}

@Injectable()
export class AgentRequestContextService {
  private readonly storage = new AsyncLocalStorage<AgentRequestContextValue>();

  run<T>(value: AgentRequestContextValue, callback: () => T): T {
    return this.storage.run(value, callback);
  }

  get(): AgentRequestContextValue | undefined {
    return this.storage.getStore();
  }

  require(): AgentRequestContextValue {
    const value = this.get();
    if (!value) throw new Error('Agent request context is unavailable');
    return value;
  }
}
