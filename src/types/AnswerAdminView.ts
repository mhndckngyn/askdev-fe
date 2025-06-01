export interface AnswerAdminView {
  id: string;
  content: string;
  votes: number;
  comments: number;
  question: {
    id: string;
    title: string;
  };
  user: {
    id: string;
    username: string;
    profilePicture: string;
  };
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
}
