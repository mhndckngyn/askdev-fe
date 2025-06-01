import { useErrorStore } from '@/stores/useErrorStore';
import { ApiResponse, QuestionAdminView } from '@/types';
import { Button, Group, Space, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconFilterEdit } from '@tabler/icons-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
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

  const handleToggleVisibility = useCallback(
    async (service: (ids: string[]) => Promise<ApiResponse>, id?: string) => {
      const questionIds = id ? [id] : selectedQuestions.map((q) => q.id);

      const response = await service(questionIds);

      if (response.success) {
        notifications.show({ message: t('toggleHideSuccess') });
        setRender((prev) => prev + 1);
      } else {
        setError(t('toggleHideError'));
      }
    },
    [selectedQuestions, setError, t],
  );

  const pagination = useMemo(
    () => ({
      totalRecords,
      currentPage: page,
      pageSize: PAGE_SIZE,
      setPage,
    }),
    [totalRecords, page, setPage],
  );

  const handleSetSelected = useCallback((selected: QuestionAdminView[]) => {
    setSelectedQuestions(selected);
  }, []);

  const setHide = useCallback(
    (question: QuestionAdminView) => {
      handleToggleVisibility(hideQuestions, question.id);
    },
    [handleToggleVisibility],
  );

  const setUnhide = useCallback(
    (question: QuestionAdminView) => {
      handleToggleVisibility(unhideQuestions, question.id);
    },
    [handleToggleVisibility],
  );

  // nếu không dùng hàm này, titleKeyword sẽ bị bỏ qua khi áp dụng advanced filter
  const setAdvancedFilter = (values: Partial<Filter>) => {
    setFilter({ ...filter, ...values });
  };

  const resetFilter = () => {
    setFilter({ titleKeyword: filter.titleKeyword });
  };

  return (
    <div className={styles.page}>
      <FilterModal
        currentFilter={filter}
        setFilter={setAdvancedFilter}
        resetFilter={resetFilter}
        opened={opened}
        onClose={close}
      />

      <Group gap="xs">
        <TextInput
          placeholder={t('searchPlaceholder')}
          className={styles.searchInput}
          onChange={(e) => {
            const value = e.target.value;
            if (filter.titleKeyword === '' && value === '') {
              return; // để tránh set value và dẫn đến load lại data
            }
            setInputValue(value);
          }}
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
          setSelected={handleSetSelected}
          setHide={setHide}
          setUnhide={setUnhide}
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
