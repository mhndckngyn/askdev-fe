import { useUserStore } from '@/stores/useUserStore';
import { Navigate, Outlet } from 'react-router-dom';

export default function VisitorGuard() {
  const { user } = useUserStore();

  if (user) {
    <Navigate to="/" replace />;
  }

  return <Outlet />;
}
