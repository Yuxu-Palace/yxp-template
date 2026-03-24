import { describe, expect, test } from 'vitest';
import { testTrpcRoute } from './test';

describe('test-route', () => {
  const client = testTrpcRoute.createCaller({});

  test('hello', async () => {
    const res = await client.test.hello('world');
    expect(res).toBe('hello world');
  });
});
