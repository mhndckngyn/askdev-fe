import publicRoutePaths from '@/routes/user/public/paths';
import { useUserStore } from '@/stores/useUserStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileRedirect() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate(publicRoutePaths.notFound);
    } else {
      navigate(
        publicRoutePaths.profilePage.replace(':username', user.username),
      );
    }
  }, [user]);

  return null;
}
