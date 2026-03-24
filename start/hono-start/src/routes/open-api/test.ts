import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import type { HonoEnv } from '@/types';
import { logger } from '@/utils/logger';

const app = new OpenAPIHono<HonoEnv>();

export const testOpenApiRoute = app.openapi(
  createRoute({
    path: '/test-openapi',
    method: 'get',
    request: {
      query: z.object({
        name: z.string().min(1).openapi({
          example: 'John Doe',
        }),
      }),
    },
    responses: {
      200: {
        content: {
          'text/plain': {
            schema: z.string().min(1),
            example: 'Hello John Doe',
          },
        },
        description: 'Success',
      },
    },
  }),
  (ctx) => {
    logger.info('test-openapi', ctx.req.query('name')!);
    const name = ctx.req.query('name');
    return ctx.text(`Hello ${name}`);
  },
);
