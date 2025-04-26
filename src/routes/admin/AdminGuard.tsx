import { useUserStore } from '@/stores/useUserStore';
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminGuard({ children }: { children: JSX.Element }) {
  const { user } = useUserStore();

  if (!user || user.role !== 'admin') {
    // TODO: bỏ comment khi làm xong
    // return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
