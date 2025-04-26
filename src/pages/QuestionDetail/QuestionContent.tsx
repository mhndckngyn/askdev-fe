import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function QuestionContent({ content }: { content: string }) {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
    content: JSON.parse(content),
  });

  if (!editor) return null;

  return <EditorContent editor={editor} />;
}
