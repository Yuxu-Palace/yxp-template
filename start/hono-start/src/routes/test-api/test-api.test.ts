import { testClient } from 'hono/testing';
import { describe, expect, test } from 'vitest';
import { createBaseRoute } from '../global-route';
import { testRoute } from './index';

describe('hono route', () => {
  const client = testClient(createBaseRoute().route('/', testRoute));

  test('hello', async () => {
    const text = await client.test.$get({ query: { name: 'world' } }).then((res) => res.text());
    expect(text).toBe('Hello world');
  });

  test('emitter', async () => {
    const text = await client['test-emitter'].$get({ query: { name: 'world' } }).then((res) => res.text());
    expect(text).toBe('');
  });
});
