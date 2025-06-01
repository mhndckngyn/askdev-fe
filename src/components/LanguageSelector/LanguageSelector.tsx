import { languages } from '@/i18n';
import { ActionIcon, Menu } from '@mantine/core';
import { IconCheck, IconLanguage } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
  const { t, i18n } = useTranslation('navbar');

  function selectLanguage(languageCode: string) {
    if (i18n.language !== languageCode) {
      i18n.changeLanguage(languageCode);
    }
  }

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="outline" size="input-sm" radius='md'>
          <IconLanguage size={18} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {Object.entries(languages).map(([code, label]) => (
          <Menu.Item
            key={code}
            onClick={() => selectLanguage(code)}
            rightSection={
              i18n.language === code ? <IconCheck size={14} /> : null
            }>
            {t(label as any)}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
