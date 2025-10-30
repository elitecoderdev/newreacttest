import {
  NavLink,
  Outlet,
  useNavigate,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import Input from '@shared/ui/Input';
import { useUI } from '@app/contexts/ui';
import { useAuth } from '@app/contexts/auth';

function useDebounced<T>(value: T, delay = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function AppLayout() {
  const { globalLoading } = useUI();
  const { user, hasRole, logout } = useAuth();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const loc = useLocation();
  const isLoginPage = loc.pathname.startsWith('/login');

  const urlQ = params.get('q') || '';
  const [q, setQ] = useState(urlQ);
  const qDebounced = useDebounced(q, 350);

  useEffect(() => {
    setQ(urlQ);
  }, [urlQ]);

  const prevAppliedQ = useRef(urlQ);
  useEffect(() => {
    if (qDebounced === prevAppliedQ.current) return;
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      if (qDebounced) p.set('q', qDebounced);
      else p.delete('q');
      p.set('page', '1');
      return p;
    });
    prevAppliedQ.current = qDebounced;
  }, [qDebounced, setParams]);

  return (
    <div>
      <header className="header">
        <div className="header-inner container">
          <nav className="nav">
            <NavLink to="/articles" className="link">
              Articles
            </NavLink>
            <NavLink to="/articles/categories" className="link">
              Categories
            </NavLink>
          </nav>

          {!isLoginPage && (
            <div className="search">
              <Input
                placeholder="Search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              {user && hasRole(['editor', 'admin']) && (
                <button onClick={() => navigate('/articles/new')}>
                  New
                </button>
              )}
              {user ? (
                <button onClick={logout}>Logout</button>
              ) : (
                <button onClick={() => navigate('/login')}>
                  Login
                </button>
              )}
              {globalLoading ? (
                <div aria-live="polite">
                  <div className="spinner" />
                </div>
              ) : null}
            </div>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
