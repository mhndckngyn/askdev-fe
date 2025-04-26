import { Route } from 'react-router-dom';
import Homepage from '@/pages/Homepage';
import TagsPage from '@/pages/TagsPage';
import QuestionDetail from '@/pages/QuestionDetail';
import ProfilePage from '@/pages/ProfilePage';

const publicRoutes = (
  <>
    <Route path="/" element={<Homepage />} />
    <Route path="/tags" element={<TagsPage />} />
    <Route path="/questions/:id" element={<QuestionDetail />} />
    <Route path="/profile/:id" element={<ProfilePage />} />
  </>
);

export default publicRoutes;
