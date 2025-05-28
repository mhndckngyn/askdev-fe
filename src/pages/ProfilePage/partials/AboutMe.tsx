import { Box, Text, TypographyStylesProvider } from '@mantine/core';
import Link from '@tiptap/extension-link';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../ProfilePage.module.css';

type Props = {
  bio: string;
  username: string;
};

export default function AboutMe({ bio, username }: Props) {
  const { t } = useTranslation('profilePage');

  const [isEmpty, setIsEmpty] = useState(false);

  const editor = useEditor({
    editable: false,
    extensions: [StarterKit, Link],
    content: JSON.parse(bio),
  });

  useEffect(() => {
    if (editor && editor.isEmpty) {
      setIsEmpty(true);
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <Box>
      <TypographyStylesProvider>
        {isEmpty ? (
          <Text className={styles['userInfo-emptyBio']}>
            {username} {t('no-bio')}
          </Text>
        ) : (
          <EditorContent editor={editor} />
        )}
      </TypographyStylesProvider>
    </Box>
  );
}
