import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dropzone/styles.css';
import { Loader, MantineProvider } from '@mantine/core';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import styles from './App.module.css';
import Homepage from './pages/Homepage';
import Welcome from './pages/Welcome';
import NavBar from './layouts/NavBar';
import Footer from './layouts/Footer';
import NotFound from './layouts/NotFound';
import AccountSuspended from './layouts/AccountSuspended';
import TagsPage from './pages/TagsPage';
import PostQuestion from './pages/PostQuestion';
import ErrorModal from './components/ErrorModal';
import ProfilePage from './pages/ProfilePage';
import ProfileRedirect from './pages/ProfileRedirect/ProfileRedirect';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';
import { ActionModal } from './components/ActionModal/ActionModal';
import { useUserStore } from './stores/useUserStore';
import { Fragment, useEffect } from 'react';
import EmailVerify from './pages/EmailVerify';
import Questions from './pages/Question/Detail';

export default function App() {
  const { fetchUser, loading } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Router>
      <MantineProvider>
        <div className={styles.app}>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <NavBar />
              <div className={styles.content}>
                <Routes>
                  <Route path="/welcome" element={<Welcome />} />
                  <Route path="/questions/detail" element={<Questions />} />
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
          )}
          <ActionModal />
          <ErrorModal />
        </div>
      </MantineProvider>
    </Router>
  );
}
