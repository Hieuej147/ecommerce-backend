import type { BaseEvent } from '@ag-ui/client';

type EventWithOptionalId = BaseEvent & {
  messageId?: string;
  toolCallId?: string;
  delta?: unknown;
  args?: string;
};

export interface PersistedEvent {
  event: BaseEvent;
  rawCount: number;
}

export class EventCoalescer {
  private readonly buffers = new Map<
    string,
    { event: EventWithOptionalId; rawCount: number }
  >();

  push(event: BaseEvent): PersistedEvent[] {
    const value = event as EventWithOptionalId;
    if (value.type === 'TEXT_MESSAGE_CONTENT' && value.messageId)
      return this.pushText(value);
    if (value.type === 'TOOL_CALL_ARGS' && value.toolCallId)
      return this.pushTool(value);
    if (value.type === 'STATE_DELTA' && Array.isArray(value.delta))
      return this.pushState(value);
    return [...this.flushAll(), { event, rawCount: 1 }];
  }

  flushAll(): PersistedEvent[] {
    const result = [...this.buffers.values()].map((entry) => ({
      event: entry.event as BaseEvent,
      rawCount: entry.rawCount,
    }));
    this.buffers.clear();
    return result;
  }

  reset(): void {
    this.buffers.clear();
  }

  private pushText(value: EventWithOptionalId): PersistedEvent[] {
    const key = `text:${value.messageId}`;
    const existing = this.buffers.get(key);
    if (existing) {
      existing.event = {
        ...existing.event,
        delta: `${String(existing.event.delta ?? '')}${String(value.delta ?? '')}`,
      };
      existing.rawCount += 1;
      return [];
    }
    const flushed = this.flushAll();
    this.buffers.set(key, {
      event: {
        ...value,
        delta: typeof value.delta === 'string' ? value.delta : '',
      },
      rawCount: 1,
    });
    return flushed;
  }

  private pushTool(value: EventWithOptionalId): PersistedEvent[] {
    const key = `tool:${value.toolCallId}`;
    const piece =
      typeof value.delta === 'string' ? value.delta : (value.args ?? '');
    const existing = this.buffers.get(key);
    if (existing) {
      existing.event = {
        ...existing.event,
        ...(typeof existing.event.delta === 'string'
          ? { delta: `${existing.event.delta}${piece}` }
          : { args: `${existing.event.args ?? ''}${piece}` }),
      };
      existing.rawCount += 1;
      return [];
    }
    const flushed = this.flushAll();
    this.buffers.set(key, {
      event: {
        ...value,
        ...(typeof value.delta === 'string'
          ? { delta: piece }
          : { args: piece }),
      },
      rawCount: 1,
    });
    return flushed;
  }

  private pushState(value: EventWithOptionalId): PersistedEvent[] {
    const existing = this.buffers.get('state');
    const delta = Array.isArray(value.delta) ? value.delta : [];
    if (existing) {
      existing.event = {
        ...existing.event,
        delta: [
          ...(Array.isArray(existing.event.delta) ? existing.event.delta : []),
          ...delta,
        ],
      };
      existing.rawCount += 1;
      return [];
    }
    const flushed = this.flushAll();
    this.buffers.set('state', { event: { ...value, delta }, rawCount: 1 });
    return flushed;
  }
}
