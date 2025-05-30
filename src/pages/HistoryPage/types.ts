// types.ts - Định nghĩa các kiểu dữ liệu cho hệ thống hoạt động

export enum ActivityType {
  QUESTION = 'QUESTION',
  ANSWER = 'ANSWER',
  COMMENT = 'COMMENT',
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
  REPORT = 'REPORT',
  QUESTION_DELETE = 'QUESTION_DELETE',
  ANSWER_DELETE = 'ANSWER_DELETE',
  COMMENT_DELETE = 'COMMENT_DELETE',
}

export enum ReportStatus {
  PENDING = 'PENDING',
  REVIEWED = 'REVIEWED',
  REJECTED = 'REJECTED',
}

export enum ContentType {
  QUESTION = 'QUESTION',
  ANSWER = 'ANSWER',
  COMMENT = 'COMMENT',
}

export interface ActivityData {
  id: string;
  type: ActivityType;
  userId: string;
  createdAt: string;

  // Dữ liệu chung
  title?: string;
  content?: string;
  questionTitle?: string;
  answerContent?: string;

  // Dữ liệu số liệu
  upvotes?: number;
  downvotes?: number;
  views?: number;
  answers?: number;

  // Trạng thái
  isSolved?: boolean;
  isChosen?: boolean;
  isHidden?: boolean;

  // Tags
  tags?: string[];

  // Vote
  voteType?: 1 | -1; // 1 cho upvote, -1 cho downvote

  // Edit
  previousTitle?: string;
  previousContent?: string;

  // Report
  reason?: string;
  status?: ReportStatus;
  reportedContentType?: ContentType;

  // Deleted content info
  deletedContentTitle?: string;
  deletedContentType?: ContentType;
}

export interface ActivityFilter {
  types?: ActivityType[];
  dateFrom?: Date;
  dateTo?: Date;
  searchQuery?: string;
}

export interface ActivityStats {
  totalQuestions: number;
  totalAnswers: number;
  totalComments: number;
  totalVotes: number;
  totalReports: number;
}

// Mapping tiếng Việt cho các loại hoạt động
export const ActivityTypeLabels: Record<ActivityType, string> = {
  [ActivityType.QUESTION]: 'Tạo câu hỏi',
  [ActivityType.ANSWER]: 'Tạo câu trả lời',
  [ActivityType.COMMENT]: 'Tạo bình luận',
  [ActivityType.QUESTION_EDIT]: 'Sửa câu hỏi',
  [ActivityType.ANSWER_EDIT]: 'Sửa câu trả lời',
  [ActivityType.COMMENT_EDIT]: 'Sửa bình luận',
  [ActivityType.QUESTION_VOTE]: 'Thích câu hỏi',
  [ActivityType.ANSWER_VOTE]: 'Thích câu trả lời',
  [ActivityType.COMMENT_VOTE]: 'Thích bình luận',
  [ActivityType.QUESTION_DOWNVOTE]: 'Không thích câu hỏi',
  [ActivityType.ANSWER_DOWNVOTE]: 'Không thích câu trả lời',
  [ActivityType.COMMENT_DOWNVOTE]: 'Không thích bình luận',
  [ActivityType.ANSWER_CHOSEN]: 'Câu trả lời được chọn',
  [ActivityType.REPORT]: 'Tạo báo cáo',
  [ActivityType.QUESTION_DELETE]: 'Xóa câu hỏi',
  [ActivityType.ANSWER_DELETE]: 'Xóa câu trả lời',
  [ActivityType.COMMENT_DELETE]: 'Xóa bình luận',
};

export const ReportStatusLabels: Record<ReportStatus, string> = {
  [ReportStatus.PENDING]: 'Đang chờ',
  [ReportStatus.REVIEWED]: 'Đã xem xét',
  [ReportStatus.REJECTED]: 'Bị từ chối',
};

export const ContentTypeLabels: Record<ContentType, string> = {
  [ContentType.QUESTION]: 'câu hỏi',
  [ContentType.ANSWER]: 'câu trả lời',
  [ContentType.COMMENT]: 'bình luận',
};
