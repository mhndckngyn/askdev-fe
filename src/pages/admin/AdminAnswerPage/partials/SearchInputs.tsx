import { TextInput } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import styles from '../AdminAnswerPage.module.css';

type Props = {
  content: {
    value: string;
    set: (newValue: string) => void;
  };
  question: {
    value: string; // questionId
    set: (newValue: string) => void;
  };
};

export default function SearchInputs({ content, question }: Props) {
  const { t } = useTranslation('adminAnswerPage');

  return (
    <>
      <TextInput
        value={content.value}
        onChange={(e) => content.set(e.target.value)}
        placeholder={t('findByContent')}
        className={styles.searchFields}
      />

      <TextInput
        value={question.value}
        onChange={(e) => question.set(e.target.value)}
        placeholder={t('findByQuestionId')}
        className={styles.searchFields}
      />
    </>
  );
}
