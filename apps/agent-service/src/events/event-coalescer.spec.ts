import { EventCoalescer } from './event-coalescer';

describe('EventCoalescer', () => {
  it('coalesces durable text deltas but leaves non-delta events ordered', () => {
    const coalescer = new EventCoalescer();
    expect(coalescer.push({ type: 'TEXT_MESSAGE_CONTENT', messageId: 'm1', delta: 'a' } as never)).toEqual([]);
    expect(coalescer.push({ type: 'TEXT_MESSAGE_CONTENT', messageId: 'm1', delta: 'b' } as never)).toEqual([]);
    const flushed = coalescer.push({ type: 'TEXT_MESSAGE_END', messageId: 'm1' } as never);
    expect(flushed[0]).toMatchObject({ rawCount: 2, event: { delta: 'ab' } });
    expect(flushed[1]).toMatchObject({ rawCount: 1, event: { type: 'TEXT_MESSAGE_END' } });
  });
});
