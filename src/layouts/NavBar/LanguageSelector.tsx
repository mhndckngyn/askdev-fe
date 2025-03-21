import { ActionIcon, Menu } from "@mantine/core";
import { IconCheck, IconLanguage } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { languages } from "@/i18n";

export default function LanguageSelector() {
  const { t, i18n } = useTranslation();

  function selectLanguage(languageCode: string) {
    i18n.changeLanguage(languageCode);
  }

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="outline" size="input-sm">
          <IconLanguage size={18} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {Object.entries(languages).map(([code, str]) => (
          <Menu.Item
            key={code}
            onClick={() => selectLanguage(code)}
            rightSection={
              i18n.language === code ? <IconCheck size={14} /> : null
            }>
            {t(str)}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
