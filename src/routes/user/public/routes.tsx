import Homepage from '@/pages/Homepage';
import ProfilePage from '@/pages/ProfilePage';
import QuestionDetail from '@/pages/QuestionDetail';
import TagsPage from '@/pages/TagsPage';
import { Route } from 'react-router-dom';
import publicRoutePaths from './paths';
import ListQuestionByTag from '@/pages/ListQuestionByTag';
import SearchPage from '@/pages/SearchPage';
import ProfileRedirect from '@/layouts/ProfileRedirect';

const publicRoutes = (
  <>
    <Route path={publicRoutePaths.homepage} element={<Homepage />} />
    <Route path={publicRoutePaths.tagsPage} element={<TagsPage />} />
    <Route
      path={publicRoutePaths.questionDetail}
      element={<QuestionDetail />}
    />
    <Route
      path={publicRoutePaths.questionByTags}
      element={<ListQuestionByTag />}
    />
    <Route path={publicRoutePaths.profilePage} element={<ProfilePage />} />
    <Route path={publicRoutePaths.profileRedirect} element={<ProfileRedirect />} />
    <Route path={publicRoutePaths.search} element={<SearchPage />} />
  </>
);

export default publicRoutes;
