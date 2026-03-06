import { showRoutes } from 'hono/dev';
import { app, type routes } from './routes';

export type AppRoute = typeof routes;
export type { TRPCRouter } from './routes/trpc';

showRoutes(app, {
  verbose: false,
});

export { app } from './routes';
