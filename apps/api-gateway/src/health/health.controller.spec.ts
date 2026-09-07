import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('returns an ok status', () => {
    expect(new HealthController().getHealth()).toEqual({ status: 'ok' });
  });
});
