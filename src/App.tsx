import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/tiptap/styles.css';
import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '@/routes';
import { useUserStore } from '@/stores/useUserStore';
import ErrorModal from './components/ErrorModal';
import ActionModal from './components/ActionModal';

export default function App() {
  const { fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Router>
      <MantineProvider>
        <AppRoutes />
        <ActionModal />
        <ErrorModal />
      </MantineProvider>
    </Router>
  );
}
