import { TextInput } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import styles from '../AdminCommentPage.module.css';

type Props = {
  content: { // input nội dung comment
    value: string;
    set: (newValue: string) => void;
  };
  parent: {
    value: string; // questionId/answerId
    set: (newValue: string) => void;
  };
};

export default function SearchInputs({ content, parent }: Props) {
  const { t } = useTranslation('adminCommentPage');

  return (
    <>
      <TextInput
        value={content.value}
        onChange={(e) => content.set(e.target.value)}
        placeholder={t('find-by-content')}
        className={styles.searchField}
      />

      <TextInput
        value={parent.value}
        onChange={(e) => parent.set(e.target.value)}
        placeholder={t('find-by-parent-id')}
        className={styles.searchField}
      />
    </>
  );
}
