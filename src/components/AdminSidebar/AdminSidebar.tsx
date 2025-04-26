import { logo } from '@/assets/images';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import UserMenu from '@/components/UserMenu';
import { Image, Text } from '@mantine/core';
import {
  IconFlag,
  IconLayoutDashboard,
  IconMessage,
  IconQuestionMark,
  IconTags,
  IconUsers
} from '@tabler/icons-react';
import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

type AdminSidebarKey = 'dashboard' | 'questions' | 'answers' | 'tags' | 'users' | 'reports';

const data: {
  link: string;
  label: AdminSidebarKey;
  icon: any; // any thay vì TablerIcon để có thể dễ thay thế 
}[] = [
  { link: '', label: 'dashboard', icon: IconLayoutDashboard },
  { link: '', label: 'questions', icon: IconQuestionMark },
  { link: '', label: 'answers', icon: IconMessage },
  { link: '', label: 'tags', icon: IconTags },
  { link: '', label: 'users', icon: IconUsers },
  { link: '', label: 'reports', icon: IconFlag },
];


export default function AdminSidebar() {
  const { t } = useTranslation('adminSidebar');
  const [active, setActive] = useState('Dashboard');

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
    </nav>
  );
}
