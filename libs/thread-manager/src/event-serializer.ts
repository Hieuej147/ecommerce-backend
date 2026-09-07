import { compactEvents, EventSchemas, type BaseEvent } from '@ag-ui/client';

type EventFields = BaseEvent & {
  messageId?: string;
  role?: string;
  delta?: unknown;
  messages?: Array<{ id: string; role: string; content: string }>;
};

export interface SerializedEventStream {
  version: 1;
  threadId: string;
  runId: string;
  events: BaseEvent[];
}

/** Portable AG-UI history serializer. A2UI activity snapshots are retained. */
export class AgUiEventSerializer {
  serialize(stream: SerializedEventStream): string {
    return JSON.stringify({ ...stream, events: this.compact(stream.events) });
  }

  deserialize(value: string): SerializedEventStream {
    const parsed: unknown = JSON.parse(value);
    if (
      !isRecord(parsed) ||
      parsed.version !== 1 ||
      typeof parsed.threadId !== 'string' ||
      typeof parsed.runId !== 'string' ||
      !Array.isArray(parsed.events)
    )
      throw new Error('Invalid serialized AG-UI event stream');
    return {
      version: 1,
      threadId: parsed.threadId,
      runId: parsed.runId,
      events: parsed.events.map(
        (event) => EventSchemas.parse(event) as BaseEvent,
      ),
    };
  }

  compact(events: readonly BaseEvent[]): BaseEvent[] {
    let source: BaseEvent[];
    try {
      source = compactEvents([...events]);
    } catch {
      source = [...events];
    }
    const output: BaseEvent[] = [];
    const messages = new Map<
      string,
      { id: string; role: string; content: string }
    >();
    for (const event of source) {
      const value = event as EventFields;
      if (value.type === 'RAW') continue;
      if (value.type === 'TEXT_MESSAGE_START' && value.messageId) {
        messages.set(value.messageId, {
          id: value.messageId,
          role: value.role ?? 'assistant',
          content: '',
        });
        continue;
      }
      if (value.type === 'TEXT_MESSAGE_CONTENT' && value.messageId) {
        const message = messages.get(value.messageId);
        if (message && typeof value.delta === 'string')
          message.content += value.delta;
        continue;
      }
      if (value.type === 'TEXT_MESSAGE_END') continue;
      if (value.type === 'MESSAGES_SNAPSHOT' && Array.isArray(value.messages)) {
        for (const message of value.messages) messages.set(message.id, message);
        continue;
      }
      output.push(event);
    }
    if (messages.size) {
      const snapshot = {
        type: 'MESSAGES_SNAPSHOT',
        messages: [...messages.values()],
      } as BaseEvent;
      const terminal = output.findIndex(
        (event) => event.type === 'RUN_FINISHED' || event.type === 'RUN_ERROR',
      );
      output.splice(terminal < 0 ? output.length : terminal, 0, snapshot);
    }
    return output.map((event) => {
      try {
        return EventSchemas.parse(event) as BaseEvent;
      } catch {
        return event;
      }
    });
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
