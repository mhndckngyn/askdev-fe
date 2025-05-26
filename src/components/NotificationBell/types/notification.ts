// types.ts
export interface User {
  username: string;
  profilePicture: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  user: User;
  contentTitle: string;
  createdAt: Date;
  isRead: boolean;
}

export type NotificationType =
  | 'QUESTION_VOTE'
  | 'ANSWER_VOTE'
  | 'COMMENT'
  | 'ANSWER'
  | 'ANSWER_CHOSEN'
  | 'REPORT'
  | 'EDIT';

export type FilterType = 'all' | 'unread';
