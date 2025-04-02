import { useUserStore } from '@/stores/useUserStore';
import { Navigate } from 'react-router-dom';

const ProfileRedirect = () => {
  const { user } = useUserStore();

  // If logged in, redirect to the correct profile page.
  if (user?.id) {
    return <Navigate to={`/profile/${user.id}`} replace />;
  }

  return <Navigate to="/welcome" replace />;
};

export default ProfileRedirect;
