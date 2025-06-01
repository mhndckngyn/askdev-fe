import React from 'react';
import {
  QuestionAnswer as QuestionIcon,
  Comment as CommentIcon,
  Edit as EditIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  CheckCircle as CheckIcon,
  Report as ReportIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { HistoryType } from './types';

interface HistoryIconProps {
  type: HistoryType;
}

export const HistoryIcon: React.FC<HistoryIconProps> = ({ type }) => {
  switch (type) {
    case HistoryType.QUESTION_CREATE:
      return <QuestionIcon />;
    case HistoryType.ANSWER_CREATE:
      return <CommentIcon />;
    case HistoryType.COMMENT_CREATE:
      return <AddIcon />;
    case HistoryType.QUESTION_EDIT:
    case HistoryType.ANSWER_EDIT:
    case HistoryType.COMMENT_EDIT:
      return <EditIcon />;
    case HistoryType.QUESTION_VOTE:
    case HistoryType.ANSWER_VOTE:
    case HistoryType.COMMENT_VOTE:
      return <ThumbUpIcon />;
    case HistoryType.QUESTION_DOWNVOTE:
    case HistoryType.ANSWER_DOWNVOTE:
    case HistoryType.COMMENT_DOWNVOTE:
      return <ThumbDownIcon />;
    case HistoryType.ANSWER_CHOSEN:
      return <CheckIcon />;
    case HistoryType.REPORT_CREATE:
      return <ReportIcon />;
    case HistoryType.QUESTION_DELETE:
    case HistoryType.ANSWER_DELETE:
    case HistoryType.COMMENT_DELETE:
      return <DeleteIcon />;
    default:
      return <QuestionIcon />;
  }
};
