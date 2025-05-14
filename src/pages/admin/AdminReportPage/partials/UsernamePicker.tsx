import { Combobox, Group, Loader, TextInput, useCombobox } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconCheck, IconUser } from '@tabler/icons-react'; // Optional for nice icons
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getUsernames } from '../services';

const SEARCH_DELAY_MS = 300;

type UsernamePickerProps = {
  value: string | null;
  onChange: (username: string | null) => void;
};

export default function UsernamePicker({
  value,
  onChange,
}: UsernamePickerProps) {
  const { t } = useTranslation('adminQuestionPage');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [inputValue, setInputValue] = useState('');
  const [query] = useDebouncedValue(inputValue, SEARCH_DELAY_MS);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    setLoading(true);

    const handleGetUsers = async () => {
      const response = await getUsernames(query);
      if (response.success) {
        const users = response.content.users.map((user: any) => user.username);
        setSearchResults(users);
      } else {
        console.error(response);
        setSearchResults([]);
      }
      setLoading(false);
    };

    handleGetUsers();
  }, [query]);

  const handleSelect = (username: string) => {
    onChange(username);
    setInputValue(username);
    combobox.closeDropdown();
  };

  const options = searchResults.map((username) => (
    <Combobox.Option
      key={username}
      value={username}
      onClick={() => handleSelect(username)}>
      <Group gap="sm">
        {value === username ? <IconCheck size={14} /> : <IconUser size={14} />}
        <span>{username}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <div>
      <Combobox store={combobox}>
        <Combobox.DropdownTarget>
          <TextInput
            label={t('username')}
            description={t('usernameDescription')}
            value={inputValue}
            placeholder={t('typeToSearch')}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
            onClick={() => combobox.openDropdown()}
            onChange={(event) => {
              setInputValue(event.currentTarget.value);
              combobox.updateSelectedOptionIndex();
            }}
          />
        </Combobox.DropdownTarget>
        <Combobox.Dropdown>
          <Combobox.Options>
            {loading ? (
              <Combobox.Empty>
                <Loader size="xs" />
              </Combobox.Empty>
            ) : inputValue === '' ? (
              <Combobox.Empty>{t('typeToSearch')}</Combobox.Empty>
            ) : searchResults.length > 0 ? (
              options
            ) : (
              <Combobox.Empty>{t('noResults')}</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}
