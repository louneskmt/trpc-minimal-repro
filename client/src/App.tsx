import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { Greeting } from './Greeting.tsx';
import { trpc } from './utils/trpc.ts';

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:2022',
        }),
      ],
    })
  );
  return (
    // Error here:
    //
    // Type 'import(".../trpc-minimal-react/node_modules/.pnpm/@tanstack+query-core@5.25.0/node_modules/@tanstack/query-core/build/modern/queryClient-pTTqDRDI", { with: { "resolution-mode": "import" } }).b' is not assignable to type 'import(".../trpc-minimal-react/node_modules/.pnpm/@tanstack+query-core@5.25.0/node_modules/@tanstack/query-core/build/modern/queryClient-QsbA-3YL").b'.
    // Property '#private' in type 'QueryClient' refers to a different member that cannot be accessed from within type 'QueryClient'.
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Greeting />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
