import { trpcServer } from '@hono/trpc-server';
import { createBaseRoute } from './global-route';
import { openApiRoute } from './open-api';
import { testRoute } from './test-api';
import { trpcRouter } from './trpc';

export const app = createBaseRoute();

export const routes = app
  .use(
    '/trpc/*',
    trpcServer({
      router: trpcRouter,
      async createContext(_opts, _ctx) {
        return {};
      },
    }),
  )
  .route('/', openApiRoute)
  .route('/', testRoute);
