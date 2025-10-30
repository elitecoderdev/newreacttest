import {
  QueryClientProvider,
  useIsFetching,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import { queryClient } from './queryClient';
import { UIProvider, useUI } from './contexts/ui';
import { FavoritesProvider } from './contexts/favorites';
import { AuthProvider } from './contexts/auth';

function GlobalLoadingBridge() {
  const { setGlobalLoading } = useUI();
  const fetching = useIsFetching();
  useEffect(() => {
    let t: any;
    if (fetching > 0)
      t = setTimeout(() => setGlobalLoading(true), 200);
    else setGlobalLoading(false);
    return () => clearTimeout(t);
  }, [fetching, setGlobalLoading]);
  return null;
}

export function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UIProvider>
      <FavoritesProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <GlobalLoadingBridge />
            {children}
          </QueryClientProvider>
        </AuthProvider>
      </FavoritesProvider>
    </UIProvider>
  );
}
