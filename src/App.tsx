import AppRoutes from '@/routes';
import { useUserStore } from '@/stores/useUserStore';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import 'mantine-datatable/styles.layer.css';
import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ActionModal from './components/ActionModal';
import ErrorModal from './components/ErrorModal';

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
        <Notifications />
      </MantineProvider>
    </Router>
  );
}
