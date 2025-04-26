import { Route } from 'react-router-dom';
import UserLayout from './UserLayout';
import memberRoutes from './member';
import publicRoutes from './public';
import visitorRoutes from './visitor';

const userRoutes = (
  <Route element={<UserLayout />}>
    {publicRoutes}
    {visitorRoutes}
    {memberRoutes}
  </Route>
);

export default userRoutes;
