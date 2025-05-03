import { TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export type Filter = {
  questionId?: string;
};

export default function AdminAnswerPage() {
  const [searchParams] = useSearchParams();
  const questionId = searchParams.get('questionId');

  const [filter, setFilter] = useState<Filter>({});

  useEffect(() => {
    if (questionId) {
      setFilter({ ...filter, questionId });
    }
  }, [questionId]);

  return (
    <div>
      <TextInput
        value={filter.questionId}
        onChange={(e) => setFilter({ ...filter, questionId: e.target.value })}
      />
    </div>
  );
}
