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

export interface HistoryItem {
  id: string;
  type: HistoryType;
  userId: string;
  contentTitle: string;
  questionId?: string;
  createdAt: Date;
  user: {
    id: string;
    username: string;
    profilePicture: string;
  };
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface HistoryFilters {
  dateRange: DateRange;
  types: HistoryType[];
  searchQuery: string;
}

export interface UseHistoryReturn {
  historyItems: HistoryItem[];
  filteredItems: HistoryItem[];
  filters: HistoryFilters;
  loading: boolean;
  selectedIds: string[];
  setFilters: (filters: Partial<HistoryFilters>) => void;
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  deleteHistoryItems: (ids: string[]) => Promise<void>;
  deleteAllHistory: () => Promise<void>;
  clearFilters: () => void;
}

export const HISTORY_TYPE_LABELS: Record<HistoryType, string> = {
  [HistoryType.QUESTION_CREATE]: 'Tạo câu hỏi',
  [HistoryType.ANSWER_CREATE]: 'Tạo câu trả lời',
  [HistoryType.COMMENT_CREATE]: 'Tạo bình luận',
  [HistoryType.QUESTION_EDIT]: 'Chỉnh sửa câu hỏi',
  [HistoryType.ANSWER_EDIT]: 'Chỉnh sửa câu trả lời',
  [HistoryType.COMMENT_EDIT]: 'Chỉnh sửa bình luận',
  [HistoryType.QUESTION_VOTE]: 'Upvote câu hỏi',
  [HistoryType.ANSWER_VOTE]: 'Upvote câu trả lời',
  [HistoryType.COMMENT_VOTE]: 'Upvote bình luận',
  [HistoryType.QUESTION_DOWNVOTE]: 'Downvote câu hỏi',
  [HistoryType.ANSWER_DOWNVOTE]: 'Downvote câu trả lời',
  [HistoryType.COMMENT_DOWNVOTE]: 'Downvote bình luận',
  [HistoryType.ANSWER_CHOSEN]: 'Chọn câu trả lời tốt nhất',
  [HistoryType.REPORT_CREATE]: 'Báo cáo nội dung',
  [HistoryType.QUESTION_DELETE]: 'Xóa câu hỏi',
  [HistoryType.ANSWER_DELETE]: 'Xóa câu trả lời',
  [HistoryType.COMMENT_DELETE]: 'Xóa bình luận',
};

export const HISTORY_TYPE_COLORS: Record<HistoryType, string> = {
  [HistoryType.QUESTION_CREATE]: '#4CAF50',
  [HistoryType.ANSWER_CREATE]: '#2196F3',
  [HistoryType.COMMENT_CREATE]: '#FF9800',
  [HistoryType.QUESTION_EDIT]: '#9C27B0',
  [HistoryType.ANSWER_EDIT]: '#9C27B0',
  [HistoryType.COMMENT_EDIT]: '#9C27B0',
  [HistoryType.QUESTION_VOTE]: '#4CAF50',
  [HistoryType.ANSWER_VOTE]: '#4CAF50',
  [HistoryType.COMMENT_VOTE]: '#4CAF50',
  [HistoryType.QUESTION_DOWNVOTE]: '#F44336',
  [HistoryType.ANSWER_DOWNVOTE]: '#F44336',
  [HistoryType.COMMENT_DOWNVOTE]: '#F44336',
  [HistoryType.ANSWER_CHOSEN]: '#FFD700',
  [HistoryType.REPORT_CREATE]: '#FF5722',
  [HistoryType.QUESTION_DELETE]: '#F44336',
  [HistoryType.ANSWER_DELETE]: '#F44336',
  [HistoryType.COMMENT_DELETE]: '#F44336',
};
