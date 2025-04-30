import { useActionStore } from '@/stores/useActionModalStore';
import { useErrorStore } from '@/stores/useErrorStore';
import { QuestionAdminView } from '@/types';
import { Button, Group, Space, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilterEdit } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AdminQuestionPage.module.css';
import FilterModal from './partials/FilterModal';
import QuestionTable from './partials/QuestionTable';
import { deleteQuestion, getQuestions } from './services';
import { notifications } from '@mantine/notifications';

export type Filter = {
  titleKeyword?: string;
  tags?: string[];
  username?: string;
  isAnswered?: boolean;
  isEdited?: boolean;
  startDate?: Date;
  endDate?: Date;
};

const SEARCH_DELAY_MS = 300;
const PAGE_SIZE = 10;

export default function AdminQuestionPage() {
  const { t } = useTranslation('adminQuestionPage');
  const setAction = useActionStore((state) => state.setAction);
  const setError = useErrorStore((state) => state.setError);

  const [opened, { open, close }] = useDisclosure(false); // FilterModal

  const [questions, setQuestions] = useState<QuestionAdminView[]>([]);
  const [filter, setFilter] = useState<Filter>({});
  const [inputValue, setInputValue] = useState(''); // input tìm kiếm câu hỏi
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [isLoading, setLoading] = useState(false);

  const [deleteQuestionId, setDeleteQuestionId] = useState('');
  const [render, setRender] = useState(0); // dùng để fetch data mới sau khi xóa

  useEffect(() => {
    const delay = setTimeout(() => {
      setFilter({ ...filter, titleKeyword: inputValue });
    }, SEARCH_DELAY_MS);

    return () => {
      clearTimeout(delay);
    };
  }, [inputValue]);

  useEffect(() => {
    setLoading(true);

    const handleGetQuestions = async () => {
      const params = {
        ...filter,
        page,
        pageSize: PAGE_SIZE,
      };

      const response = await getQuestions(params);
      if (response.success) {
        setQuestions(response.content.questions);
        setTotalRecords(response.content.pagination.total);
      } else {
        setQuestions([]); // set thành rỗng để table hiển thị empty state
      }

      setLoading(false);
    };

    handleGetQuestions();
  }, [filter, page, render]);

  useEffect(() => {
    if (!deleteQuestionId) {
      return;
    }

    const handleDeleteQuestion = async () => {
      const response = await deleteQuestion(deleteQuestionId);
      if (response.success) {
        notifications.show({ message: t('deleteSuccess') });
        setRender(render + 1); // force re-render để lấy data mới
      } else {
        setError(t('deleteError')); // TODO: Hiển thị lỗi chi tiết hơn
      }
    };

    setAction(t('deleteConfirm'), t('delete'), handleDeleteQuestion); // hàm xóa sẽ được gọi khi người dùng xác nhận
  }, [deleteQuestionId]);

  const pagination = {
    totalRecords,
    currentPage: page,
    pageSize: PAGE_SIZE,
    setPage,
  };

  return (
    <div className={styles.page}>
      <FilterModal
        currentFilter={filter}
        setFilter={setFilter}
        opened={opened}
        onClose={close}
      />

      <Group gap="xs">
        <TextInput
          placeholder={t('searchTitle')}
          className={styles.searchInput}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={open} leftSection={<IconFilterEdit size={18} />}>
          {t('filters')}
        </Button>
      </Group>
      <Space h="md" />

      <div className={styles.tableContainer}>
        <QuestionTable
          records={questions}
          pagination={pagination}
          isLoading={isLoading}
          setDelete={setDeleteQuestionId}
        />
      </div>
    </div>
  );
}
