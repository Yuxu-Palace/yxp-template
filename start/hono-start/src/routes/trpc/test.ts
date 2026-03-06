import { z } from 'zod';
import { publicProcedure, trpc } from './trpc-instance';

export const testTrpcRoute = trpc.router({
  test: trpc.router({
    hello: publicProcedure.input(z.string()).query(({ input }) => `hello ${input}`),
  }),
});
