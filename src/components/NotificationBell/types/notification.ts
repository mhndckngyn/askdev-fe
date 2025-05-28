export interface User {
  username: string;
  profilePicture: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  actor: User;
  contentTitle: string;
  createdAt: string;
  isRead: boolean;
  message: string;
  questionId: string;
}

export type NotificationType =
  | 'QUESTION_VOTE'
  | 'ANSWER_VOTE'
  | 'COMMENT_VOTE'
  | 'COMMENT'
  | 'ANSWER'
  | 'ANSWER_CHOSEN';

export type FilterType = 'all' | 'unread';
