import { Hono } from 'hono';
import type { HonoEnv } from '@/types';

const app = new Hono<HonoEnv>();

export const testRoute = app
  .get('/test', (ctx) => {
    const name = ctx.req.query('name') || 'Hone';
    return ctx.text(`Hello ${name}`);
  })
  .get('/test-emitter', (ctx) => {
    ctx.get('emitter').emit(ctx, 'test:emitter', ctx.req.query('name') || 'Hone');
    return ctx.text('');
  });
