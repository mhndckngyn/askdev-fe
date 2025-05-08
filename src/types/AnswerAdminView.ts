export interface AnswerAdminView {
  id: string;
  content: string;
  votes: number;
  comments: number;
  questionId: string;
  user: {
    id: string;
    username: string;
  };
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
}
