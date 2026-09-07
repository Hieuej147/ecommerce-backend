import { AgentEventSerializer } from './event-serializer';

describe('AgentEventSerializer', () => {
  it('removes RAW/chunk lifecycle noise and retains the reconstructed message', () => {
    const result = new AgentEventSerializer().compact([
      { type: 'RAW', event: {} } as never,
      {
        type: 'TEXT_MESSAGE_START',
        messageId: 'm1',
        role: 'assistant',
      } as never,
      {
        type: 'TEXT_MESSAGE_CONTENT',
        messageId: 'm1',
        delta: 'hello',
      } as never,
      {
        type: 'TEXT_MESSAGE_CONTENT',
        messageId: 'm1',
        delta: ' world',
      } as never,
      { type: 'TEXT_MESSAGE_END', messageId: 'm1' } as never,
      { type: 'RUN_FINISHED', threadId: 't1', runId: 'r1' } as never,
    ]);
    expect(result).toEqual([
      {
        type: 'MESSAGES_SNAPSHOT',
        messages: [{ id: 'm1', role: 'assistant', content: 'hello world' }],
      },
      { type: 'RUN_FINISHED', threadId: 't1', runId: 'r1' },
    ]);
  });

  it('keeps A2UI activity snapshots in the durable replay stream', () => {
    const activity = {
      type: 'ACTIVITY_SNAPSHOT',
      activityType: 'a2ui',
      content: { surfaceId: 'dashboard', components: [] },
    } as never;
    const result = new AgentEventSerializer().compact([
      activity,
      { type: 'RUN_FINISHED', threadId: 't1', runId: 'r1' } as never,
    ]);
    expect(result).toContainEqual(activity);
  });
});
