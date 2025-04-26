import Dashboard from '@/pages/admin/Dashboard';
import { Route } from 'react-router-dom';
import AdminGuard from './AdminGuard';
import AdminLayout from './AdminLayout';

const adminRoutes = (
  <Route
    element={
      <AdminGuard>
        <AdminLayout />
      </AdminGuard>
    }>
    <Route path="/admin/dashboard" element={<Dashboard />} />
  </Route>
);

export default adminRoutes;
