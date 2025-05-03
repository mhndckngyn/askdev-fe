import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Divider, Box } from '@mui/material';
import QuestionView from './QuestionTag/Questionview';
import InteractionBar from './QuestionTag/InteractionBar';
import { getQuestionsByTag } from './QuestionTag/QuestionServices';
import { ApiResponse } from '@/types';

export default function ListQuestionByTag() {
  const { id } = useParams<{ id: string }>();
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res: ApiResponse = await getQuestionsByTag(id);
        setQuestions(res.content);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!questions.length) return <div>No questions found for this tag.</div>;

  return (
    <Box>
      {questions.map((question) => (
        <Paper
          sx={{
            width: '70%',
            borderRadius: '15px',
            margin: '0 auto',
            padding: 2,
            mb: 3,
          }}>
          <Box key={question.id}>
            <QuestionView question={question} />
            <Divider sx={{ mt: '20px', borderColor: 'black' }} />
            <InteractionBar question={question} />
            <Divider sx={{ borderColor: 'black' }} />
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
