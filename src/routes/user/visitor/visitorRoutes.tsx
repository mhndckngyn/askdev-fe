import { Route } from 'react-router-dom';
import VisitorGuard from './VisitorGuard';
import Welcome from '@/pages/Welcome';
import EmailVerify from '@/pages/EmailVerify';

const visitorRoutes = (
  <Route element={<VisitorGuard />}>
    <Route path="/welcome" element={<Welcome />} />
    <Route path="/verify-email" element={<EmailVerify />} />
  </Route>
);

export default visitorRoutes;
