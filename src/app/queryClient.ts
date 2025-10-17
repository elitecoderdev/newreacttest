import { QueryClient } from '@tanstack/react-query';

const isCypress =
  typeof window !== 'undefined' && (window as any).Cypress;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: isCypress ? false : 3,
      retryDelay: isCypress ? 0 : undefined,
    },
  },
});
