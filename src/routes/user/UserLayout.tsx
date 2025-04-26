import Footer from '@/layouts/Footer';
import NavBar from '@/components/NavBar';
import { Outlet } from 'react-router-dom';
import styles from './UserLayout.module.css';

export default function UserLayout() {
  return (
    <div className={styles.app}>
      <NavBar />
      <div className={styles.content}>
        {/* TODO: Sidebar */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
