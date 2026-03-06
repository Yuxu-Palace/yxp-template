import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { hc } from 'hono/client';
import { PORT } from './config';
import type { AppRoute, TRPCRouter } from './entry';

const HOST = `http://localhost:${PORT}`;

export const client = hc<AppRoute>(HOST);

export const trpcClient = createTRPCProxyClient<TRPCRouter>({
  links: [httpBatchLink({ url: HOST })],
});
