import Dashboard from '@/pages/admin/Dashboard';
import { Route } from 'react-router-dom';
import AdminGuard from './AdminGuard';
import AdminLayout from './AdminLayout';
import AdminQuestionPage from '@/pages/admin/AdminQuestionPage';
import adminRoutePaths from './paths';
import DashboardQA from '@/pages/admin/DashboardQA';

const adminRoutes = (
  <Route
    element={
      <AdminGuard>
        <AdminLayout />
      </AdminGuard>
    }>
    <Route path={adminRoutePaths.dashboard} element={<Dashboard />} />
    <Route path={adminRoutePaths.questions} element={<AdminQuestionPage />} />
    <Route path={adminRoutePaths.qandaDashboard} element={<DashboardQA />} />
  </Route>
);

export default adminRoutes;
