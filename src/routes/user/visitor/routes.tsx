import { Route } from 'react-router-dom';
import VisitorGuard from './VisitorGuard';
import Welcome from '@/pages/Welcome';
import EmailVerify from '@/pages/EmailVerify';
import visitorRoutePaths from './paths';
import ResetPassword from '@/pages/ResetPassword';
import AccountSuspended from '@/layouts/AccountSuspended';

const visitorRoutes = (
  <Route element={<VisitorGuard />}>
    <Route path={visitorRoutePaths.welcome} element={<Welcome />} />
    <Route path={visitorRoutePaths.verifyEmail} element={<EmailVerify />} />
    <Route path={visitorRoutePaths.resetPassword} element={<ResetPassword />} />
    <Route path={visitorRoutePaths.accountSuspended} element={<AccountSuspended />} />
  </Route>
);

export default visitorRoutes;
