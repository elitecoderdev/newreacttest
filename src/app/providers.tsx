import { Provider } from 'react-redux';
import {
  QueryClientProvider,
  useIsFetching,
} from '@tanstack/react-query';
import { store } from './store';
import { queryClient } from './queryClient';
import { setGlobalLoading } from '@features/ui/state/uiSlice';
import { useEffect } from 'react';

function GlobalLoadingBridge() {
  const fetching = useIsFetching();
  useEffect(() => {
    let t: any;
    if (fetching > 0) {
      t = setTimeout(
        () => store.dispatch(setGlobalLoading(true)),
        200
      );
    } else {
      store.dispatch(setGlobalLoading(false));
    }
    return () => clearTimeout(t);
  }, [fetching]);
  return null;
}

export function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GlobalLoadingBridge />
        {children}
      </QueryClientProvider>
    </Provider>
  );
}
