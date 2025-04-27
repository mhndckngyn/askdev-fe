import { Route } from 'react-router-dom';
import MemberGuard from './MemberGuard';
import PostQuestion from '@/pages/PostQuestion';
import EditProfile from '@/pages/EditProfile';
import ChangePassword from '@/pages/ChangePassword';

const memberRoutePaths = {
  postQueston: '/post-question',
  editProfile: '/edit-profile',
  changePassword: '/change-password',
};

const memberRoutes = (
  <Route element={<MemberGuard />}>
    <Route path={memberRoutePaths.postQueston} element={<PostQuestion />} />
    <Route path={memberRoutePaths.editProfile} element={<EditProfile />} />
    <Route
      path={memberRoutePaths.changePassword}
      element={<ChangePassword />}
    />
  </Route>
);

export { memberRoutePaths, memberRoutes };
