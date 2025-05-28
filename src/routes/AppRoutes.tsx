import NotFound from '@/layouts/NotFound';
import { Route, Routes } from 'react-router-dom';
import adminRoutes from './admin/routes';
import publicRoutePaths from './user/public/paths';
import userRoutes from './user/routes';

export default function AppRoutes() {
  return (
    <Routes>
      {userRoutes}
      {adminRoutes}
      <Route path={publicRoutePaths.notFound} element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

/* 
<div className={styles.app}>
  <>
    <div className={styles.content}>
      <Routes>
        <Route path="/profile" element={<ProfileRedirect />} />
        <Route path="/suspended" element={<AccountSuspended />} />
      </Routes>
    </div>
  </>
</div>
*/
