import { useUserStore } from '@/stores/useUserStore';
import { Navigate } from 'react-router-dom';


// NEEDED ANYMORE?
const ProfileRedirect = () => {
  const { user } = useUserStore();

  // If logged in, redirect to the correct profile page.
  if (user?.id) {
    return <Navigate to={`/profile/${user.id}`} replace />; // replace = replaces tab's history stack
  }

  return <Navigate to="/welcome" replace />;
};

export default ProfileRedirect;
