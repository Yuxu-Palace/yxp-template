import { testClient } from 'hono/testing';
import { describe, expect, test } from 'vitest';
import { createBaseRoute } from '../global-route';
import { testOpenApiRoute } from './test';

describe('test open api', () => {
  const client = testClient(createBaseRoute().route('/', testOpenApiRoute));

  test('hello', async () => {
    const text = await client['test-openapi'].$get({ query: { name: 'world' } }).then((res) => res.text());
    expect(text).toBe('Hello world');
  });
});
