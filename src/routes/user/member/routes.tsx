import ChangePassword from '@/pages/ChangePassword';
import EditProfile from '@/pages/EditProfile';
import EditQuestion from '@/pages/EditQuestion';
import HistoryPage from '@/pages/HistoryPage';
import PostQuestion from '@/pages/PostQuestion';
import { Route } from 'react-router-dom';
import MemberGuard from './MemberGuard';
import memberRoutePaths from './paths';

const memberRoutes = (
  <Route element={<MemberGuard />}>
    <Route path={memberRoutePaths.postQueston} element={<PostQuestion />} />
    <Route path={memberRoutePaths.editProfile} element={<EditProfile />} />
    <Route path={memberRoutePaths.historyPage} element={<HistoryPage />} />

    <Route
      path={memberRoutePaths.changePassword}
      element={<ChangePassword />}
    />
    <Route path={memberRoutePaths.editQuestion} element={<EditQuestion />} />
  </Route>
);

export default memberRoutes;
