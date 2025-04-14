import { useErrorStore } from '@/stores/useErrorStore';
import {
  CheckIcon,
  Combobox,
  Group,
  Input,
  Loader,
  Pill,
  PillsInput,
  Space,
  useCombobox,
} from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type TagPickerProps = {
  selectedTags: string[];
  onSelectedTagChange: (tags: string[]) => void;
};

async function fetchTags(query: string): Promise<string[]> {
  const tags = ['React', 'JavaScript', 'TypeScript', 'C++'];

  // Simulating a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        tags.filter((item) => item.toLowerCase().includes(query.toLowerCase())),
      );
    }, 300);
  });
}

const SEARCH_DELAY_MS = 300;
const MAX_TAGS = 5;

export default function TagPicker({
  selectedTags,
  onSelectedTagChange,
}: TagPickerProps) {
  const { t } = useTranslation('postQuestion');
  const setError = useErrorStore((state) => state.setError);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [inputValue, setInputValue] = useState(''); // search term, updated when user types
  const [query, setQuery] = useState(''); // actual search term, sent to backend after delay
  const [queryResults, setQueryResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Delay search
  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(inputValue);
    }, SEARCH_DELAY_MS);

    return () => clearTimeout(handler);
  }, [inputValue]);

  // Search for tags
  useEffect(() => {
    if (query.trim() === '') return;
    setLoading(true);

    fetchTags(query).then((data) => {
      setQueryResults(data);
      setLoading(false);
    });
  }, [query]);

  // Remove existing tag
  const handleTagRemove = (value: string) => {
    const current = selectedTags.filter((tag) => tag !== value);
    onSelectedTagChange(current);
  };

  // Add tag/remove existing tag
  const handleTagSelect = (value: string) => {
    if (selectedTags.includes(value)) {
      handleTagRemove(value);
    } else {
      if (selectedTags.length === MAX_TAGS) {
        setError(t('tags.max-tags'));
      } else {
        onSelectedTagChange([...selectedTags, value]);
      }
    }
  };

  const values = selectedTags.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleTagRemove(item)}>
      {item}
    </Pill>
  ));

  const options = queryResults.map((item) => (
    <Combobox.Option
      value={item}
      key={item}
      active={selectedTags.includes(item)}>
      <Group gap="sm">
        {selectedTags.includes(item) ? <CheckIcon size={12} /> : null}
        <span>{item}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <div>
      <Input.Label required>{t('tags.tag-select')}</Input.Label>
      <Input.Description>{t('tags.tag-description')}</Input.Description>
      <Space h="xs" />
      <Combobox store={combobox} onOptionSubmit={handleTagSelect}>
        <Combobox.DropdownTarget>
          <PillsInput onClick={() => combobox.openDropdown()}>
            <Pill.Group>
              {values}
              <Combobox.EventsTarget>
                <PillsInput.Field
                  onFocus={() => combobox.openDropdown()}
                  onBlur={() => combobox.closeDropdown()}
                  value={inputValue}
                  placeholder={t('tags.search-tag')}
                  onChange={(event) => {
                    combobox.updateSelectedOptionIndex();
                    setInputValue(event.currentTarget.value);
                  }}
                  onKeyDown={(event) => {
                    if (
                      event.key === 'Backspace' &&
                      inputValue.length === 0 &&
                      selectedTags.length > 0
                    ) {
                      event.preventDefault();
                      handleTagRemove(selectedTags[selectedTags.length - 1]);
                    }
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
            ) : query.trim() === '' ? (
              <Combobox.Empty>
                {t('tags.search-for-tag-suggestion')}
              </Combobox.Empty>
            ) : options.length > 0 ? (
              options
            ) : (
              <Combobox.Option
                value={query}
                onClick={() => {
                  handleTagSelect(query);
                }}>
                <Group>
                  {!selectedTags.includes(query) ? (
                    <>
                      <IconPlus size="16" /> {t('tags.add')} "{query}"
                    </>
                  ) : (
                    <>
                      <IconMinus size="16" /> {t('tags.remove')} "{query}"
                    </>
                  )}
                </Group>
              </Combobox.Option>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}
