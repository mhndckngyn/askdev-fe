import { Group, SegmentedControl } from '@mantine/core';
import { useState } from 'react';
import Homepage from '../Dashboard/Homepage';
import Dashboard from '../DashboardQA';
import DashboardReport from '../DashboardReport';
import styles from './DashboardContainer.module.css';

type Section = 'general' | 'content' | 'report';

export default function DashboardContainer() {
  const [section, setSection] = useState<Section>('general');

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
            { label: 'Tổng quan', value: 'general' },
            { label: 'Nội dung', value: 'content' },
            { label: 'Báo cáo', value: 'report' },
          ]}
          color="blue"
          transitionDuration={500}
          transitionTimingFunction="linear"
        />
      </div>
      {section === 'general' && <Homepage />}
      {section === 'content' && <Dashboard />}
      {section === 'report' && <DashboardReport />}
    </Group>
  );
}
