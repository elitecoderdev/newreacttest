import { User } from '@domain/auth/types';

export const authRepository = {
  async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: User }> {
    const r = await fetch('/api/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!r.ok) throw new Error('Invalid credentials');
    return r.json();
  },
  async me(token: string): Promise<User> {
    const r = await fetch('/api/me', {
      headers: { authorization: `Bearer ${token}` },
    });
    if (!r.ok) throw new Error('Unauthorized');
    return r.json();
  },
};
