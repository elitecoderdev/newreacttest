import { useState } from 'react';
import { useAuth } from '@app/contexts/auth';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const nav = useNavigate();
  const loc = useLocation() as any;
  const from = loc.state?.from ?? '/articles';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      await login(email, password);
      nav(from, { replace: true });
    } catch (e: any) {
      setErr(e?.message ?? 'Login failed');
    }
  };

  return (
    <div
      className="container"
      style={{ paddingTop: 24, maxWidth: 440 }}
    >
      <h2 className="h">Login</h2>
      <form
        onSubmit={submit}
        className="grid"
        style={{ gridTemplateColumns: '1fr' }}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="pw">Password</label>
          <input
            id="pw"
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {err ? (
          <div style={{ color: 'var(--danger)' }}>{err}</div>
        ) : null}
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit">Sign in</button>
        </div>
      </form>
    </div>
  );
}
