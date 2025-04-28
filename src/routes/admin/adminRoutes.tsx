import Dashboard from '@/pages/admin/Dashboard';
import { Route } from 'react-router-dom';
import AdminGuard from './AdminGuard';
import AdminLayout from './AdminLayout';

const adminRoutePaths = {
  dashboard: "/admin/dashboard"
}

const adminRoutes = (
  <Route
    element={
      <AdminGuard>
        <AdminLayout />
      </AdminGuard>
    }>
    <Route path={adminRoutePaths.dashboard} element={<Dashboard />} />
  </Route>
);

export { adminRoutePaths, adminRoutes };
