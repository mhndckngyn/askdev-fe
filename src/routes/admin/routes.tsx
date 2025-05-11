import AdminAnswerPage from '@/pages/admin/AdminAnswerPage';
import AdminQuestionPage from '@/pages/admin/AdminQuestionPage';
import DashboardContainer from '@/pages/admin/DashboardContainer/DashboardContainer';
import DashboardQA from '@/pages/admin/DashboardQA';
import DashboardReport from '@/pages/admin/DashboardReport';
import { Route } from 'react-router-dom';
import AdminGuard from './AdminGuard';
import AdminLayout from './AdminLayout';
import adminRoutePaths from './paths';

const adminRoutes = (
  <Route
    element={
      <AdminGuard>
        <AdminLayout />
      </AdminGuard>
    }>
    <Route path={adminRoutePaths.dashboard} element={<DashboardContainer />} />
    <Route path={adminRoutePaths.questions} element={<AdminQuestionPage />} />
    <Route path={adminRoutePaths.answers} element={<AdminAnswerPage />} />
    <Route path={adminRoutePaths.qandaDashboard} element={<DashboardQA />} />
    <Route
      path={adminRoutePaths.reportDashboard}
      element={<DashboardReport />}
    />
  </Route>
);

export default adminRoutes;
