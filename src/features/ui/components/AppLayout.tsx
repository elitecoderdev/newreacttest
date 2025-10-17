import {
  NavLink,
  Outlet,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@app/store';
import Input from '@shared/ui/Input';
import { useEffect, useState } from 'react';

export default function AppLayout() {
  const loading = useSelector((s: RootState) => s.ui.globalLoading);
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const urlQ = params.get('q') || '';
  const [q, setQ] = useState(urlQ);

  useEffect(() => {
    setQ(urlQ);
  }, [urlQ]);

  useEffect(() => {
    const t = setTimeout(() => {
      setParams((prev) => {
        const p = new URLSearchParams(prev);
        if (q) p.set('q', q);
        else p.delete('q');
        p.set('page', '1');
        return p;
      });
    }, 350);
    return () => clearTimeout(t);
  }, [q, setParams]);

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
          <div className="search">
            <Input
              placeholder="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button onClick={() => navigate('/articles/new')}>
              New
            </button>
            {loading ? (
              <div aria-live="polite">
                <div
                  className="spinner"
                  style={{ width: 16, height: 16 }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
