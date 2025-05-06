import { Route } from 'react-router-dom';
import MemberGuard from './MemberGuard';
import PostQuestion from '@/pages/PostQuestion';
import EditProfile from '@/pages/EditProfile';
import ChangePassword from '@/pages/ChangePassword';
import memberRoutePaths from './paths';
import ProfilePage from '@/pages/ProfilePage';

const memberRoutes = (
  <Route element={<MemberGuard />}>
    <Route path={memberRoutePaths.postQueston} element={<PostQuestion />} />
    <Route path={memberRoutePaths.editProfile} element={<EditProfile />} />
    <Route
      path={memberRoutePaths.changePassword}
      element={<ChangePassword />}
    />
    <Route path={`${memberRoutePaths.profile}/:id`} element={<ProfilePage />} />
  </Route>
);

export default memberRoutes;
