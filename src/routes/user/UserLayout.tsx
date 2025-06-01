import NavBar from '@/components/NavBar';
import UserSidebar from '@/components/UserSidebar';
import Footer from '@/layouts/Footer';
import clsx from 'clsx';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './UserLayout.module.css';
import visitorRoutePaths from './visitor/paths';

function shouldShowSidebar(path: string) {
  const noSidebar = [...Object.values(visitorRoutePaths)];
  return !noSidebar.includes(path);
}

export default function UserLayout() {
  const location = useLocation();
  const showSidebar = shouldShowSidebar(location.pathname);

  return (
    <div className={styles.app}>
      <NavBar />
      <div className={clsx(styles.content, showSidebar && styles.withSidebar)}>
        {showSidebar && <UserSidebar />}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
