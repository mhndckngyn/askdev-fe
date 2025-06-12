import PageLoader from '@/components/PageLoader';
import { useUserStore } from '@/stores/useUserStore';
import { JSX, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

type State = "ADMIN" | "NOT_ADMIN" | "LOADING";

export default function AdminGuard({ children }: { children: JSX.Element }) {
  const { user } = useUserStore();
  const [state, setState] = useState<State>("LOADING");

  useEffect(() => {
    if (!user) {
      setState("LOADING");
    }
    else if (user.role !== 'ADMIN') {
      setState("NOT_ADMIN");
    } else {
      setState("ADMIN");
    }
  }, [user]);

  if (state === "NOT_ADMIN") {
    return <Navigate to="/" replace />;
  }

  if (state === "LOADING") {
    return <PageLoader />;
  }

  return <>{children}</>;
}
