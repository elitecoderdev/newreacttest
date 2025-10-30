import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { authRepository } from '@infra/auth/repository';
import { User } from '@domain/auth/types';

type AuthContextValue = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (roles: string | string[]) => boolean;
};

const KEY = 'auth:v1';
const Ctx = createContext<AuthContextValue | undefined>(undefined);

function readPersist(): { token: string; user: User } | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.token && parsed?.user) return parsed;
    return null;
  } catch {
    return null;
  }
}

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const persisted = readPersist();
  const [user, setUser] = useState<User | null>(
    persisted?.user ?? null
  );
  const [token, setToken] = useState<string | null>(
    persisted?.token ?? null
  );

  useEffect(() => {
    if (token && user)
      localStorage.setItem(KEY, JSON.stringify({ token, user }));
    else localStorage.removeItem(KEY);
  }, [token, user]);

  const login = async (email: string, password: string) => {
    const { token: t, user: u } = await authRepository.login(
      email,
      password
    );
    setToken(t);
    setUser(u);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const hasRole = (roles: string | string[]) => {
    if (!user) return false;
    const arr = Array.isArray(roles) ? roles : [roles];
    return arr.some((r) => user.roles.includes(r));
  };

  const value = useMemo(
    () => ({ user, token, login, logout, hasRole }),
    [user, token]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAuth must be used within AuthProvider');
  return v;
}
