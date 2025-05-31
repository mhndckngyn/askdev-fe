import { useErrorStore } from '@/stores/useErrorStore';
import { ApiResponse } from '@/types';
import { AnswerAdminView } from '@/types/AnswerAdminView';
import { Button, Group, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconFilterEdit } from '@tabler/icons-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Filter } from '../AdminQuestionPage/AdminQuestionPage';
import styles from './AdminAnswerPage.module.css';
import AnswerFilterModal from './partials/AnswerFilterModal';
import AnswerTable from './partials/AnswerTable';
import SearchInputs from './partials/SearchInputs';
import SelectedRowActions from './partials/SelectedRowActions';
import { getAnswers, hideAnswers, unhideAnswers } from './services';

export type AnswerFilter = Omit<
  Filter,
  'titleKeyword' | 'tags' | 'isAnswered'
> & {
  questionId?: string;
  content?: string;
};

const SEARCH_DELAY_MS = 300;
const PAGE_SIZE = 10;

export default function AdminAnswerPage() {
  const { t } = useTranslation('adminAnswerPage');
  const setError = useErrorStore((state) => state.setError);
  const [searchParams] = useSearchParams();

  const [filter, setFilter] = useState<AnswerFilter>({});
  const [answers, setAnswers] = useState<AnswerAdminView[]>([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<AnswerAdminView[]>([]);

  const [questionIdInput, setQuestionIdInput] = useState(''); // tim kiem theo id cau hoi
  const [contentInput, setContentInput] = useState(''); // tim kiem theo noi dung cau tra loi

  const [opened, { open, close }] = useDisclosure(false); // filter modal
  const [isLoading, setLoading] = useState(false);
  const [render, setRender] = useState(0);

  useEffect(() => {
    setLoading(true);

    const handleGetAnswers = async () => {
      const params = {
        ...filter,
        page,
        pageSize: PAGE_SIZE,
      };

      const response = await getAnswers(params);
      if (response.success) {
        setAnswers(response.content.answers);
        setTotalRecords(response.content.pagination.total);
      } else {
        setAnswers([]);
      }

      setLoading(false);
    };

    handleGetAnswers();
  }, [filter, page, render]);

  useEffect(() => {
    const param = searchParams.get('questionId');
    if (param) {
      setQuestionIdInput(param); // tìm kiếm answer theo questionId nếu nó được truyền vào từ params
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilter({
        ...filter,
        content: contentInput,
        questionId: questionIdInput,
      });
    }, SEARCH_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [contentInput, questionIdInput]);

  const setAdvancedFilter = (values: Partial<AnswerFilter>) => {
    setFilter({ ...filter, ...values });
  };

  const resetFilter = () => {
    setFilter({
      questionId: filter.questionId,
      content: filter.content,
    });
  };

  const handleToggleVisibility = useCallback(
    async (service: (ids: string[]) => Promise<ApiResponse>, id?: string) => {
      const answerIds = id ? [id] : selectedAnswers.map((a) => a.id);

      const response = await service(answerIds);
      if (response.success) {
        notifications.show({ message: t('toggleVisibilitySuccess') });
        setRender((render) => render + 1); // dùng hàm updater thì không cần thêm render vào depList
      } else {
        setError(t('toggleVisibilityError'));
      }
    },
    [selectedAnswers, setError, t],
  );

  const pagination = useMemo(
    () => ({
      pageSize: PAGE_SIZE,
      currentPage: page,
      totalRecords,
      setPage,
    }),
    [page, totalRecords, setPage],
  );

  const selection = useMemo(
    () => ({
      selected: selectedAnswers,
      setSelected: setSelectedAnswers,
    }),
    [selectedAnswers, setSelectedAnswers],
  );

  const visibility = useMemo(
    () => ({
      setHide: (id: string) => handleToggleVisibility(hideAnswers, id),
      setUnhide: (id: string) => handleToggleVisibility(unhideAnswers, id),
    }),
    [handleToggleVisibility],
  );

  return (
    <div className={styles.page}>
      <AnswerFilterModal
        opened={opened}
        onClose={close}
        currentFilter={filter}
        setFilter={setAdvancedFilter}
        resetFilter={resetFilter}
      />

      <Group gap="sm">
        <SearchInputs
          content={{
            value: contentInput,
            set: setContentInput,
          }}
          question={{
            value: questionIdInput,
            set: setQuestionIdInput,
          }}
        />

        <Button
          onClick={open}
          className={styles.filterBtn}
          leftSection={<IconFilterEdit className={styles.tableIcon} />}>
          {t('advancedFilters')}
        </Button>
      </Group>

      <Space h="md" />

      <div className={styles.tableContainer}>
        <AnswerTable
          records={answers}
          pagination={pagination}
          selection={selection}
          isLoading={isLoading}
          visibility={visibility}
        />
      </div>

      <Space h="xs" />
      <SelectedRowActions
        selectedAnswers={selectedAnswers}
        onHideAnswers={() => handleToggleVisibility(hideAnswers)}
        onUnhideAnswers={() => handleToggleVisibility(unhideAnswers)}
      />
    </div>
  );
}
