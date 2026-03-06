import { initTRPC } from '@trpc/server';

export interface TRPCContext {}

export const trpc = initTRPC.context<TRPCContext>().create();

export const publicProcedure = trpc.procedure;
