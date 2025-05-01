import { useUserStore } from '@/stores/useUserStore';
import { Navigate, Outlet } from 'react-router-dom';
import publicRoutePaths from '../public/paths';

export default function VisitorGuard() {
  const { user } = useUserStore();

  if (user) {
    <Navigate to={publicRoutePaths.homepage} replace />;
  }

  return <Outlet />;
}
