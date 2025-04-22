import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/tiptap/styles.css';
import { Fragment, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import styles from './App.module.css';
import ActionModal from './components/ActionModal';
import ErrorModal from './components/ErrorModal';
import AccountSuspended from './layouts/AccountSuspended';
import Footer from './layouts/Footer';
import NavBar from './layouts/NavBar';
import NotFound from './layouts/NotFound';
import ChangePassword from './pages/ChangePassword';
import EditProfile from './pages/EditProfile';
import EmailVerify from './pages/EmailVerify';
import Homepage from './pages/Homepage';
import PostQuestion from './pages/PostQuestion';
import ProfilePage from './pages/ProfilePage';
import ProfileRedirect from './pages/ProfileRedirect/ProfileRedirect';
import TagsPage from './pages/TagsPage';
import Welcome from './pages/Welcome';
import { useUserStore } from './stores/useUserStore';

export default function App() {
  const { fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Router>
      <MantineProvider>
        <div className={styles.app}>
          <Fragment>
            <NavBar />
            <div className={styles.content}>
              <Routes>
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/tags" element={<TagsPage />} />
                <Route path="/questions/post" element={<PostQuestion />} />
                <Route path="/profile" element={<ProfileRedirect />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route
                  path="/change-password"
                  element={<ChangePassword />}></Route>
                <Route path="/verify-email" element={<EmailVerify />} />
                <Route path="/suspended" element={<AccountSuspended />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </Fragment>
          <ActionModal />
          <ErrorModal />
        </div>
      </MantineProvider>
    </Router>
  );
}
