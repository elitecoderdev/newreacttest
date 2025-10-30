import { createContext, useContext, useMemo, useState } from 'react';

type UIContextValue = {
  globalLoading: boolean;
  setGlobalLoading: (v: boolean) => void;
};

const Ctx = createContext<UIContextValue | undefined>(undefined);

export function UIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [globalLoading, setGlobalLoading] = useState(false);
  const value = useMemo(
    () => ({ globalLoading, setGlobalLoading }),
    [globalLoading]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useUI() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useUI must be used within UIProvider');
  return v;
}
