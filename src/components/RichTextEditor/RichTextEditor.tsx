import { TableRemoveCoumn as IconTableRemoveColumn } from '@/assets/images';
import { ActionIcon, Input, Space } from '@mantine/core';
import { Link, RichTextEditor as MantineRichTextEditor } from '@mantine/tiptap';
import {
  IconSourceCode,
  IconTableDown,
  IconTableExport,
  IconTableImport,
  IconTableOff,
  IconTablePlus,
} from '@tabler/icons-react';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import { JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { common, createLowlight } from 'lowlight';
import { useTranslation } from 'react-i18next';
import styles from './RichTextEditor.module.css';

type EditorPlugins = {
  inline?: boolean; // bold, italic, strikethrough
  code?: boolean;
  heading?: boolean;
  block?: boolean; // blockquote, hr, lists
  link?: boolean;
  table?: boolean;
};

type RichTextEditorProps = {
  label: string;
  description: string;
  onContentChange: (value: JSONContent) => void;
  plugins?: EditorPlugins;
  height?: number;
  required?: boolean;
};

const lowlight = createLowlight(common);

export default function RichTextEditor({
  onContentChange,
  label,
  description,
  plugins = {
    inline: false,
    code: false,
    heading: false,
    block: false,
    link: false,
    table: false,
  },
  height,
  required = false,
}: RichTextEditorProps) {
  const { t } = useTranslation('richTextEditor');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Link,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onContentChange(json);
    },
  });

  const handleInsertTable = () => {
    if (!editor) {
      return;
    }

    const isInsideTable = editor.isActive('table');

    if (!isInsideTable) {
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: false })
        .run();
    }
  };

  const handleRemoveTable = () => {
    if (!editor) {
      return;
    }

    editor.chain().focus().deleteTable().run();
  };

  const handleAddTableRow = () => {
    if (!editor) {
      return;
    }

    editor.chain().focus().addRowAfter().run();
  };

  const handleRemoveTableRow = () => {
    if (!editor) {
      return;
    }

    editor.chain().focus().deleteRow().run();
  };

  const handleAddTableColumn = () => {
    if (!editor) {
      return;
    }

    editor.chain().focus().addColumnAfter().run();
  };

  const handleRemoveTableColumn = () => {
    if (!editor) {
      return;
    }

    editor.chain().focus().deleteColumn().run();
  };

  return (
    <div>
      <Input.Label required={required}>{label}</Input.Label>
      <Input.Description>{description}</Input.Description>
      <Space h="xs" />

      <MantineRichTextEditor
        editor={editor}
        className={styles.tiptap}
        aria-labelledby="rte-label"
        style={height ? { height: `${height}px` } : undefined}>
        <MantineRichTextEditor.Toolbar sticky stickyOffset={0}>
          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.Undo />
            <MantineRichTextEditor.Redo />
          </MantineRichTextEditor.ControlsGroup>
          {plugins.inline && (
            <MantineRichTextEditor.ControlsGroup>
              <MantineRichTextEditor.Bold />
              <MantineRichTextEditor.Italic />
              <MantineRichTextEditor.Strikethrough />
            </MantineRichTextEditor.ControlsGroup>
          )}
          {plugins.code && (
            <MantineRichTextEditor.ControlsGroup>
              <MantineRichTextEditor.Code />
              <MantineRichTextEditor.CodeBlock icon={IconSourceCode} />
            </MantineRichTextEditor.ControlsGroup>
          )}
          {plugins.heading && (
            <MantineRichTextEditor.ControlsGroup>
              <MantineRichTextEditor.H1 />
              <MantineRichTextEditor.H2 />
              <MantineRichTextEditor.H3 />
            </MantineRichTextEditor.ControlsGroup>
          )}
          {plugins.block && (
            <MantineRichTextEditor.ControlsGroup>
              <MantineRichTextEditor.Blockquote/>
              <MantineRichTextEditor.Hr />
              <MantineRichTextEditor.BulletList />
              <MantineRichTextEditor.OrderedList />
            </MantineRichTextEditor.ControlsGroup>
          )}
          {plugins.link && (
            <MantineRichTextEditor.ControlsGroup>
              <MantineRichTextEditor.Link />
              <MantineRichTextEditor.Unlink />
            </MantineRichTextEditor.ControlsGroup>
          )}
          {(plugins.inline ||
            plugins.code ||
            plugins.block ||
            plugins.link) && (
            <MantineRichTextEditor.ControlsGroup>
              <MantineRichTextEditor.ClearFormatting />
            </MantineRichTextEditor.ControlsGroup>
          )}
          {plugins.table && (
            <ActionIcon.Group>
              <ActionIcon
                aria-label={t('table.insert-table')}
                title={t('table.insert-table')}
                onClick={handleInsertTable}
                variant="default"
                className={styles.control}>
                <IconTablePlus className={styles.controlIcon} />
              </ActionIcon>
              <ActionIcon
                aria-label={t('table.remove-table')}
                title={t('table.remove-table')}
                onClick={handleRemoveTable}
                variant="default"
                className={styles.control}>
                <IconTableOff className={styles.controlIcon} />
              </ActionIcon>
              <ActionIcon
                aria-label={t('table.add-row')}
                title={t('table.add-row')}
                onClick={handleAddTableRow}
                variant="default"
                className={styles.control}>
                <IconTableDown className={styles.controlIcon} />
              </ActionIcon>
              <ActionIcon
                aria-label={t('table.remove-row')}
                title={t('table.remove-row')}
                onClick={handleRemoveTableRow}
                variant="default"
                className={styles.control}>
                <IconTableImport className={styles.controlIcon} />
              </ActionIcon>
              <ActionIcon
                aria-label={t('table.add-column')}
                title={t('table.add-column')}
                onClick={handleAddTableColumn}
                variant="default"
                className={styles.control}>
                <IconTableExport className={styles.controlIcon} />
              </ActionIcon>
              <ActionIcon
                aria-label={t('table.remove-column')}
                title={t('table.remove-column')}
                onClick={handleRemoveTableColumn}
                variant="default"
                className={styles.control}>
                <IconTableRemoveColumn className={styles.controlIcon} />
              </ActionIcon>
            </ActionIcon.Group>
          )}
        </MantineRichTextEditor.Toolbar>
        <MantineRichTextEditor.Content />
      </MantineRichTextEditor>
    </div>
  );
}
