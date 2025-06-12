import { Group, SegmentedControl } from '@mantine/core';
import { useState } from 'react';
import Homepage from '../Dashboard/Homepage';
import Dashboard from '../DashboardQA';
import DashboardReport from '../DashboardReport';
import styles from './DashboardContainer.module.css';
import { useTranslation } from 'react-i18next';

type Section = 'overview' | 'content' | 'report';

export default function DashboardContainer() {
  const { t } = useTranslation('adminDashboardPage');

  const [section, setSection] = useState<Section>('overview');

  return (
    <Group>
      <div className={styles.menuContainer}>
        <SegmentedControl
          classNames={{
            root: styles.root,
          }}
          value={section}
          onChange={(value) => setSection(value as Section)}
          data={[
            { label: t('overview'), value: 'overview' },
            { label: t('content'), value: 'content' },
            { label: t('report'), value: 'report' },
          ]}
          color="blue"
          transitionDuration={500}
          transitionTimingFunction="linear"
        />
      </div>
      {section === 'overview' && <Homepage />}
      {section === 'content' && <Dashboard />}
      {section === 'report' && <DashboardReport />}
    </Group>
  );
}
