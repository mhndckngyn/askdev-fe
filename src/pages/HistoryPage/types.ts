export enum HistoryType {
  QUESTION_CREATE = 'QUESTION_CREATE',
  ANSWER_CREATE = 'ANSWER_CREATE',
  COMMENT_CREATE = 'COMMENT_CREATE',
  QUESTION_EDIT = 'QUESTION_EDIT',
  ANSWER_EDIT = 'ANSWER_EDIT',
  COMMENT_EDIT = 'COMMENT_EDIT',
  QUESTION_VOTE = 'QUESTION_VOTE',
  ANSWER_VOTE = 'ANSWER_VOTE',
  COMMENT_VOTE = 'COMMENT_VOTE',
  QUESTION_DOWNVOTE = 'QUESTION_DOWNVOTE',
  ANSWER_DOWNVOTE = 'ANSWER_DOWNVOTE',
  COMMENT_DOWNVOTE = 'COMMENT_DOWNVOTE',
  ANSWER_CHOSEN = 'ANSWER_CHOSEN',
  REPORT_CREATE = 'REPORT_CREATE',
  QUESTION_DELETE = 'QUESTION_DELETE',
  ANSWER_DELETE = 'ANSWER_DELETE',
  COMMENT_DELETE = 'COMMENT_DELETE',
}

export const HISTORY_TYPE_LABELS: Record<HistoryType, string> = {
  [HistoryType.QUESTION_CREATE]: 'history.labels.questionCreate',
  [HistoryType.ANSWER_CREATE]: 'history.labels.answerCreate',
  [HistoryType.COMMENT_CREATE]: 'history.labels.commentCreate',
  [HistoryType.QUESTION_EDIT]: 'history.labels.questionEdit',
  [HistoryType.ANSWER_EDIT]: 'history.labels.answerEdit',
  [HistoryType.COMMENT_EDIT]: 'history.labels.commentEdit',
  [HistoryType.QUESTION_VOTE]: 'history.labels.questionVote',
  [HistoryType.ANSWER_VOTE]: 'history.labels.answerVote',
  [HistoryType.COMMENT_VOTE]: 'history.labels.commentVote',
  [HistoryType.QUESTION_DOWNVOTE]: 'history.labels.questionDownvote',
  [HistoryType.ANSWER_DOWNVOTE]: 'history.labels.answerDownvote',
  [HistoryType.COMMENT_DOWNVOTE]: 'history.labels.commentDownvote',
  [HistoryType.ANSWER_CHOSEN]: 'history.labels.answerChosen',
  [HistoryType.REPORT_CREATE]: 'history.labels.reportCreate',
  [HistoryType.QUESTION_DELETE]: 'history.labels.questionDelete',
  [HistoryType.ANSWER_DELETE]: 'history.labels.answerDelete',
  [HistoryType.COMMENT_DELETE]: 'history.labels.commentDelete',
};

export const HistoryTypeColor = (type: HistoryType): string => {
  const colorMap: Record<HistoryType, string> = {
    [HistoryType.QUESTION_CREATE]: '#3498db',
    [HistoryType.ANSWER_CREATE]: '#2ecc71',
    [HistoryType.COMMENT_CREATE]: '#f39c12',
    [HistoryType.QUESTION_EDIT]: '#9b59b6',
    [HistoryType.ANSWER_EDIT]: '#9b59b6',
    [HistoryType.COMMENT_EDIT]: '#9b59b6',
    [HistoryType.QUESTION_VOTE]: '#27ae60',
    [HistoryType.ANSWER_VOTE]: '#27ae60',
    [HistoryType.COMMENT_VOTE]: '#27ae60',
    [HistoryType.QUESTION_DOWNVOTE]: '#e74c3c',
    [HistoryType.ANSWER_DOWNVOTE]: '#e74c3c',
    [HistoryType.COMMENT_DOWNVOTE]: '#e74c3c',
    [HistoryType.ANSWER_CHOSEN]: '#f1c40f',
    [HistoryType.REPORT_CREATE]: '#e67e22',
    [HistoryType.QUESTION_DELETE]: '#95a5a6',
    [HistoryType.ANSWER_DELETE]: '#95a5a6',
    [HistoryType.COMMENT_DELETE]: '#95a5a6',
  };
  return colorMap[type] || '#3498db';
};

export interface HistoryItem {
  id: string;
  type: HistoryType;
  contentTitle: string;
  userId: string;
  createdAt: Date;
  questionId?: string;
}

export interface HistoryFilters {
  searchQuery: string;
  types: HistoryType[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}

export interface PaginationState {
  page: number;
  hasMore: boolean;
  loading: boolean;
}

export const ITEMS_PER_PAGE = 20;
