import {
  Combobox,
  Group,
  Loader,
  Pill,
  PillsInput,
  Space,
  useCombobox,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getTags } from '../services';

const SEARCH_DELAY_MS = 300;

type TagPickerForFilterProps = {
  value: string[];
  onChange: (tags: string[]) => void;
};

type Tag = {
  id: string;
  name: string;
};

export default function TagPicker({
  value,
  onChange,
}: TagPickerForFilterProps) {
  const { t } = useTranslation('adminQuestionPage');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [inputValue, setInputValue] = useState('');
  const [query] = useDebouncedValue(inputValue, SEARCH_DELAY_MS);
  const [searchResults, setSearchResults] = useState<Tag[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    (async () => {
      const response = await getTags(query);
      if (response.success) {
        setSearchResults(response.content.tags);
      } else {
        console.error(response);
        setSearchResults([]);
      }

      setLoading(false);
    })();
  }, [query]);

  const handleTagSelect = (tagName: string) => {
    if (value.includes(tagName)) {
      onChange(value.filter((tag) => tag !== tagName)); // remove
    } else {
      onChange([...value, tagName]); // add
    }
  };

  const selectedTags = value.map((tag, index) => (
    <Pill key={index} withRemoveButton onRemove={() => handleTagSelect(tag)}>
      {tag}
    </Pill>
  ));

  const tagOptions = searchResults.map((tag) => (
    <Combobox.Option
      key={tag.id}
      value={tag.name}
      active={value.includes(tag.name)}
      onClick={() => handleTagSelect(tag.name)}>
      <Group gap="sm">
        {value.includes(tag.name) && <IconCheck size={12} />}
        <span>{tag.name}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <div>
      <Space h="xs" />
      <Combobox store={combobox}>
        <Combobox.DropdownTarget>
          <PillsInput
            label={t('tags')}
            description={t('tagDescription')}
            onClick={() => combobox.openDropdown()}>
            <Pill.Group>
              {selectedTags}
              <Combobox.EventsTarget>
                <PillsInput.Field
                  placeholder={t('typeToSearch')}
                  value={inputValue}
                  onFocus={() => combobox.openDropdown()}
                  onBlur={() => combobox.closeDropdown()}
                  onChange={(e) => {
                    combobox.updateSelectedOptionIndex();
                    setInputValue(e.currentTarget.value);
                  }}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>
        <Combobox.Dropdown>
          <Combobox.Options>
            {loading ? (
              <Combobox.Empty>
                <Loader size="xs" />
              </Combobox.Empty>
            ) : inputValue === '' ? (
              <Combobox.Empty>{t('typeToSearch')}</Combobox.Empty>
            ) : tagOptions.length > 0 ? (
              tagOptions
            ) : (
              <Combobox.Empty>{t('noResults')}</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}
