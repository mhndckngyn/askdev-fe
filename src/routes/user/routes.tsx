import { Route } from 'react-router-dom';
import UserLayout from './UserLayout';
import memberRoutes from './member/routes';
import publicRoutes from './public/routes';
import visitorRoutes from './visitor/routes';

const userRoutes = (
  <Route element={<UserLayout />}>
    {publicRoutes}
    {visitorRoutes}
    {memberRoutes}
  </Route>
);

export default userRoutes;
