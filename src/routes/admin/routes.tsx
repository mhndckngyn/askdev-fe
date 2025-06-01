import AdminAnswerPage from '@/pages/admin/AdminAnswerPage';
import AdminTagPage from '@/pages/admin/AdminTagPage';
import AdminQuestionPage from '@/pages/admin/AdminQuestionPage';
import AdminReportPage from '@/pages/admin/AdminReportPage';
import DashboardContainer from '@/pages/admin/DashboardContainer/DashboardContainer';
import DashboardQA from '@/pages/admin/DashboardQA';
import DashboardReport from '@/pages/admin/DashboardReport';
import { Route } from 'react-router-dom';
import AdminGuard from './AdminGuard';
import AdminLayout from './AdminLayout';
import adminRoutePaths from './paths';
import AdminUserPage from '@/pages/admin/AdminUserPage';
import AdminCommentPage from '@/pages/admin/AdminCommentPage';

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
    <Route path={adminRoutePaths.comments} element={<AdminCommentPage />} />
    <Route path={adminRoutePaths.tags} element={<AdminTagPage />} />
    <Route path={adminRoutePaths.users} element={<AdminUserPage />} />
    <Route path={adminRoutePaths.reports} element={<AdminReportPage />} />
    <Route path={adminRoutePaths.qandaDashboard} element={<DashboardQA />} />
    <Route
      path={adminRoutePaths.reportDashboard}
      element={<DashboardReport />}
    />
  </Route>
);

export default adminRoutes;
