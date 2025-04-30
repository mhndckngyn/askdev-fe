import Homepage from '@/pages/Homepage';
import ProfilePage from '@/pages/ProfilePage';
import QuestionDetail from '@/pages/QuestionDetail';
import TagsPage from '@/pages/TagsPage';
import { Route } from 'react-router-dom';
import publicRoutePaths from './paths';

const publicRoutes = (
  <>
    <Route path={publicRoutePaths.homepage} element={<Homepage />} />
    <Route path={publicRoutePaths.tagsPage} element={<TagsPage />} />
    <Route
      path={publicRoutePaths.questionDetail}
      element={<QuestionDetail />}
    />
    <Route path={publicRoutePaths.profilePage} element={<ProfilePage />} />
  </>
);

export default publicRoutes;
