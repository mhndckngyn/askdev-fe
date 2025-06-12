import { useErrorStore } from '@/stores/useErrorStore';
import { Button, Group, Skeleton, Stack, Text } from '@mantine/core';
import { IconFlareFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getContentSuggestion } from '../../services';
import styles from './ContentSuggestion.module.css';

type Props = {
  questionTitle: string;
};

export default function ContentSuggestion({ questionTitle }: Props) {
  const { t } = useTranslation('postQuestion');
  const setError = useErrorStore((state) => state.setError);

  const [result, setResult] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (isLoading) {
      return;
    }

    if (!questionTitle || questionTitle === '') {
      setError(t('suggestion.title-required'));
      return;
    }

    setLoading(true);
    const response = await getContentSuggestion(questionTitle);
    if (response.success) {
      const list = response.content
        .split('\n')
        .filter((line) => line.trim().startsWith('-'))
        .map((line) => line.replace(/^-\s*/, ''));
      setResult(list);
    } else {
      setError(t('suggestion.error-generate'));
    }
    setLoading(false);
  };

  const skeleton = (
    <>
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} height="1rem" mt="sm" />
        ))}
    </>
  );

  return (
    <Stack className={styles.container} gap='xs'>
      <Group justify="space-between">
        <Stack gap="4px">
          <Text className={styles.title}>{t('suggestion.title')}</Text>
          <Text className={styles.description}>
            {t('suggestion.description')}
          </Text>
        </Stack>
        <Button
          onClick={handleSubmit}
          loading={isLoading}
          rightSection={<IconFlareFilled className={styles.buttonIcon} />}>
          {t('suggestion.button')}
        </Button>
      </Group>
        {result.length > 0 && !isLoading && (
          <ul className={styles.suggestionList}>
            {result.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      {isLoading && skeleton}
    </Stack>
  );
}
