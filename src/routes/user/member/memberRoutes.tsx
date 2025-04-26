import { Route } from 'react-router-dom';
import MemberGuard from './MemberGuard';
import PostQuestion from '@/pages/PostQuestion';
import EditProfile from '@/pages/EditProfile';
import ChangePassword from '@/pages/ChangePassword';

const memberRoutes = (
  <Route element={<MemberGuard />}>
    <Route path="/post-question" element={<PostQuestion />} />
    <Route path="/edit-profile" element={<EditProfile />} />
    <Route path="/change-password" element={<ChangePassword />} />
  </Route>
);

export default memberRoutes;
