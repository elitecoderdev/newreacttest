import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type FavoritesContextValue = {
  ids: Set<string>;
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => void;
};

const KEY = 'favorites:v1';
const Ctx = createContext<FavoritesContextValue | undefined>(
  undefined
);

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ids, setIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return new Set();
      return new Set(JSON.parse(raw) as string[]);
    } catch {
      return new Set();
    }
  });
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify([...ids]));
  }, [ids]);
  const value = useMemo(
    () => ({
      ids,
      isFavorite: (id: string) => ids.has(id),
      toggle: (id: string) =>
        setIds((prev) => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        }),
    }),
    [ids]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFavorites() {
  const v = useContext(Ctx);
  if (!v)
    throw new Error(
      'useFavorites must be used within FavoritesProvider'
    );
  return v;
}
