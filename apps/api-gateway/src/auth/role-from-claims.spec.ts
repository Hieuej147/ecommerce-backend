import { roleFromSessionClaims } from './role-from-claims';

describe('roleFromSessionClaims', () => {
  it('reads the recommended metadata claim', () => {
    expect(roleFromSessionClaims({ metadata: { role: 'admin' } })).toBe('admin');
  });

  it('supports snake-case and direct role claims', () => {
    expect(roleFromSessionClaims({ public_metadata: { role: 'admin' } })).toBe('admin');
    expect(roleFromSessionClaims({ role: 'admin' })).toBe('admin');
  });

  it('defaults unknown claims to customer', () => {
    expect(roleFromSessionClaims({})).toBe('customer');
  });
});
