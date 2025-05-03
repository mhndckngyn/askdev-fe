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
  IconUsers,
  IconHome2,
} from '@tabler/icons-react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

type AdminSidebarKey =
  | 'Trang chủ'
  | 'dashboard'
  | 'questions'
  | 'answers'
  | 'tags'
  | 'members'
  | 'reports';

const data: {
  link?: string;
  label: AdminSidebarKey | string;
  icon?: any;
  children?: { link: string; label: string }[];
}[] = [
  { link: '/admin', label: 'Trang chủ', icon: IconHome2 },
  {
    label: 'dashboard',
    icon: IconLayoutDashboard,
    children: [
      { link: '/admin/dashboard/users', label: 'Thống kê người dùng' },
      { link: '/admin/dashboard/Q&A', label: 'Thống kê câu hỏi' },
      { link: '/admin/dashboard/report', label: 'Thống kê báo cáo' },
    ],
  },
  { link: '/admin/questions', label: 'questions', icon: IconQuestionMark },
  { link: '/admin/answers', label: 'answers', icon: IconMessage },
  { link: '/admin/tags', label: 'tags', icon: IconTags },
  { link: '/admin/members', label: 'members', icon: IconUsers },
  { link: '/admin/reports', label: 'reports', icon: IconFlag },
];

export default function AdminSidebar() {
  const { t } = useTranslation('adminSidebar');
  const [activePath, setActivePath] = useState<string>('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const location = useLocation();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const links = data.map((item) => {
    const isActiveParent = item.children?.some(
      (child) => child.link === activePath,
    );
    const isDropdownOpen = openDropdown === item.label;

    if (item.children) {
      return (
        <div key={item.label}>
          <div
            className={clsx(styles.link, {
              [styles.active]: isActiveParent || isDropdownOpen,
            })}
            onClick={() =>
              setOpenDropdown(isDropdownOpen ? null : (item.label as string))
            }>
            {item.icon && (
              <item.icon className={styles.linkIcon} stroke={1.5} />
            )}
            <span>{t(item.label as any)}</span>
          </div>
          {isDropdownOpen &&
            item.children.map((child) => (
              <Link
                key={child.label}
                to={child.link}
                className={clsx(styles.subLink, {
                  [styles.active]: activePath === child.link,
                })}>
                <span className={styles.subBullet}>•</span>
                {child.label}
              </Link>
            ))}
        </div>
      );
    }

    return (
      <Link
        className={clsx(styles.link, {
          [styles.active]: activePath === item.link,
        })}
        to={item.link!}
        key={item.label}
        onClick={() => {
          setOpenDropdown(null);
        }}>
        {item.icon && <item.icon className={styles.linkIcon} stroke={1.5} />}
        <span>{t(item.label as any)}</span>
      </Link>
    );
  });

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
