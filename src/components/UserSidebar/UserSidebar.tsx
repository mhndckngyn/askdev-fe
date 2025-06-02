import { Button } from '@mantine/core';
import {
  IconHome2,
  IconPlus,
  IconQuestionMark,
  IconTags,
  IconUsers,
} from '@tabler/icons-react';
import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './UserSidebar.module.css';
import publicRoutePaths from '@/routes/user/public/paths';
import { useUserStore } from '@/stores/useUserStore';

type UserSidebarKey = 'homepage' | 'questions' | 'tags' | 'members';

const data: {
  link: string;
  label: UserSidebarKey;
  icon: any; // any thay vì TablerIcon để có thể dễ thay thế
}[] = [
  { link: publicRoutePaths.homepage, label: 'homepage', icon: IconHome2 },
  {
    link: publicRoutePaths.questionsPage,
    label: 'questions',
    icon: IconQuestionMark,
  } /* TODO */,
  { link: publicRoutePaths.tagsPage, label: 'tags', icon: IconTags },
  {
    link: publicRoutePaths.memberPage,
    label: 'members',
    icon: IconUsers,
  } /* TODO */,
];

export default function UserSidebar() {
  const { t } = useTranslation('userSidebar');
  const user = useUserStore((state) => state.user);
  const [active, setActive] = useState<UserSidebarKey>('homepage');

  const navItems = data.map((item) => (
    <Link
      className={clsx(styles.link, item.label === active && styles.active)}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}>
      <item.icon className={styles.linkIcon} stroke={1.5} />
      <span>{t(item.label)}</span>
    </Link>
  ));

  return (
    <nav className={styles.navbar}>
      <div className={styles.navMain}>
        {user && (
          <Button
            component={Link}
            to="/post-question"
            leftSection={<IconPlus />}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            size="md"
            radius="xl"
            className={styles.actionButton}
            fullWidth>
            {t('postQuestion')}
          </Button>
        )}

        {navItems}
      </div>
    </nav>
  );
}
