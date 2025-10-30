import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/auth';

export function Protected() {
  const { user } = useAuth();
  const loc = useLocation();
  if (!user)
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: loc.pathname + loc.search }}
      />
    );
  return <Outlet />;
}

export function RoleGate({ roles }: { roles: string[] }) {
  const { hasRole } = useAuth();
  if (!hasRole(roles)) return <Navigate to="/articles" replace />;
  return <Outlet />;
}

export function GuestOnly() {
  const { user } = useAuth();
  if (user) return <Navigate to="/articles" replace />;
  return <Outlet />;
}
