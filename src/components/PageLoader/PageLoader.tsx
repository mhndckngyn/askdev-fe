import { Box, Loader } from '@mantine/core';
import styles from './PageLoader.module.css';

export default function PageLoader() {
  return (
    <Box className={styles.loader}>
      <Loader color="blue" />
    </Box>
  );
}
