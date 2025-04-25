import { Paper, Divider } from '@mui/material';
import QuestionView from './Questionview';
import InteractionBar from './InteractionBar';
import CommentView from './CommentView';

export default function Questionpage() {
  return (
    <Paper
      sx={{
        width: '70%',
        borderRadius: '15px',
        margin: '0 auto',
      }}>
      <QuestionView />
      <Divider sx={{ mt: '20px', borderColor: 'black' }} />
      <InteractionBar />
      <Divider sx={{ borderColor: 'black' }} />
      <CommentView />
    </Paper>
  );
}
