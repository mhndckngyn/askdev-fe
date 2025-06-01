import { logo } from '@/assets/images';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import UserMenu from '@/components/UserMenu';
import adminRoutePaths from '@/routes/admin/paths';
import { Image, Text } from '@mantine/core';
import {
  IconFlag,
  IconLayoutDashboard,
  IconMessages,
  IconQuestionMark,
  IconShare3,
  IconTags,
  IconUsers
} from '@tabler/icons-react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

type AdminSidebarKey =
  | 'dashboard'
  | 'questions'
  | 'answers'
  | 'comments'
  | 'tags'
  | 'users'
  | 'reports';

const data: {
  link: string;
  label: AdminSidebarKey;
  icon: any; // any thay vì TablerIcon để có thể dễ thay thế
}[] = [
  {
    link: adminRoutePaths.dashboard,
    label: 'dashboard',
    icon: IconLayoutDashboard,
  },
  {
    link: adminRoutePaths.questions,
    label: 'questions',
    icon: IconQuestionMark,
  },
  { link: adminRoutePaths.answers, label: 'answers', icon: IconShare3 },
  { link: adminRoutePaths.comments, label: 'comments', icon: IconMessages},
  { link: adminRoutePaths.tags, label: 'tags', icon: IconTags },
  { link: adminRoutePaths.users, label: 'users', icon: IconUsers },
  { link: adminRoutePaths.reports, label: 'reports', icon: IconFlag },
];

export default function AdminSidebar() {
  const { t } = useTranslation('adminSidebar');
  const [active, setActive] = useState<AdminSidebarKey>();

  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = data.find((item) => item.link === currentPath);
    if (activeItem) {
      setActive(activeItem.label);
    }
  }, [location]);

  const links = data.map((item) => (
    <Link
      className={clsx(styles.link, { [styles.active]: item.label === active })}
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
      <div className={styles.container}>
        <div className={styles.navMain}>
          <Link to="/" className={styles.header}>
            <Image src={logo} h={32} w={32} />
            <Text visibleFrom="sm" size="xl" fw="bold">
              AskDev
            </Text>
          </Link>
          {links}
        </div>
        <div className={styles.navFooter}>
          <div className={styles.footerBtn}>
            <ThemeSwitcher />
            <LanguageSelector />
          </div>
          <UserMenu bottom={true} />
        </div>
      </div>
    </nav>
  );
}