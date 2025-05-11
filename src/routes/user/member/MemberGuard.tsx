import { useUserStore } from '@/stores/useUserStore';
import { Navigate, Outlet } from 'react-router-dom';

export default function MemberGuard() {
  const { user } = useUserStore();
  
  if (!user) {
    return <Navigate to="/" replace />; /* TODO: Đổi thành trang yêu cầu đăng nhập */
  }

  return <Outlet />;
}
