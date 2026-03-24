import { testTrpcRoute } from './test';
import { trpc } from './trpc-instance';

export const trpcRouter = trpc.mergeRouters(testTrpcRoute);

export type TRPCRouter = typeof trpcRouter;
