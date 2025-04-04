import { useUserStore } from '@/stores/useUserStore';
import { Navigate } from 'react-router-dom';

type RedirectIfAuthenticatedProps = {
  authRedirect: string;
  rejectRedirect?: string;
};

const RedirectIfAuthenticated = ({
  authRedirect,
  rejectRedirect = '/welcome',
}: RedirectIfAuthenticatedProps) => {
  const { user } = useUserStore();

  // If logged in, redirect to the correct profile page.
  if (user?.id) {
    return <Navigate to={`/${authRedirect}`} replace />;
  }

  return <Navigate to={`${rejectRedirect}`} replace />;
};

export default RedirectIfAuthenticated;
