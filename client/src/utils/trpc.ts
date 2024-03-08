import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../server/index.ts';

export const trpc = createTRPCReact<AppRouter>();
