import { useErrorStore } from '@/stores/useErrorStore';
import { ApiResponse, QuestionAdminView } from '@/types';
import { Button, Group, Space, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconFilterEdit } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AdminQuestionPage.module.css';
import FilterModal from './partials/FilterModal';
import QuestionTable from './partials/QuestionTable';
import SelectedRowActions from './partials/SelectedRowActions';
import { getQuestions, hideQuestions, unhideQuestions } from './services';

export type Filter = {
  titleKeyword?: string;
  tags?: string[];
  username?: string;
  isAnswered?: boolean;
  hiddenOption?: boolean /* undefined: both, true: only hidden, false: no hidden */;
  isEdited?: boolean;
  startDate?: Date;
  endDate?: Date;
};

const SEARCH_DELAY_MS = 300;
const PAGE_SIZE = 10;

export default function AdminQuestionPage() {
  const { t } = useTranslation('adminQuestionPage');
  const setError = useErrorStore((state) => state.setError);

  const [opened, { open, close }] = useDisclosure(false); // FilterModal

  const [questions, setQuestions] = useState<QuestionAdminView[]>([]);
  const [filter, setFilter] = useState<Filter>({});
  const [inputValue, setInputValue] = useState(''); // input tìm kiếm câu hỏi
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [isLoading, setLoading] = useState(false);

  const [selectedQuestions, setSelectedQuestions] = useState<
    QuestionAdminView[]
  >([]);
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
        setQuestions([]); // để table hiển thị empty state
      }

      setLoading(false);
    };

    handleGetQuestions();
  }, [filter, page, render]);

  const handleToggleVisibility = async (
    service: (ids: string[]) => Promise<ApiResponse>,
    id?: string,
  ) => {
    const questionIds = id ? [id] : selectedQuestions.map((q) => q.id); // sử dụng id truyền vào hoặc id từ record đã chọn
    const response = await service(questionIds);
    if (response.success) {
      notifications.show({ message: t('toggleHideSuccess') });
      setRender(render + 1); // force re-render để lấy data mới
    } else {
      setError(t('toggleHideError'));
    }
  };

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
        resetFilter={() => setFilter({})}
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
          selected={selectedQuestions}
          setSelected={setSelectedQuestions}
          setHide={(question: QuestionAdminView) => {
            handleToggleVisibility(hideQuestions, question.id);
          }}
          setUnhide={(question: QuestionAdminView) => {
            handleToggleVisibility(unhideQuestions, question.id);
          }}
        />
      </div>
      <Space h="xs" />

      <SelectedRowActions
        selectedQuestions={selectedQuestions}
        onHideQuestions={() => handleToggleVisibility(hideQuestions)}
        onUnhideQuestions={() => handleToggleVisibility(unhideQuestions)}
      />
    </div>
  );
}
