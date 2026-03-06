import { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import type { HonoEnv } from '@/types';
import { testOpenApiRoute } from './test';

const app = new OpenAPIHono<HonoEnv>();

export const openApiRoute = app.route('/', testOpenApiRoute);

app.doc('/doc', {
  info: {
    title: 'An API',
    version: 'v1',
  },
  openapi: '3.1.0',
});

app.get(
  '/scalar',
  Scalar({
    url: '/doc',
    hideClientButton: true,
    defaultHttpClient: {
      targetKey: 'js',
      clientKey: 'fetch',
    },
  }),
);
