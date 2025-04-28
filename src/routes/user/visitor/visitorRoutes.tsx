import { Route } from 'react-router-dom';
import VisitorGuard from './VisitorGuard';
import Welcome from '@/pages/Welcome';
import EmailVerify from '@/pages/EmailVerify';

const visitorRoutePaths = {
  welcome: '/welcome',
  verifyEmail: '/verify-email',
};

const visitorRoutes = (
  <Route element={<VisitorGuard />}>
    <Route path={visitorRoutePaths.welcome} element={<Welcome />} />
    <Route path={visitorRoutePaths.verifyEmail} element={<EmailVerify />} />
  </Route>
);

export { visitorRoutePaths, visitorRoutes };
