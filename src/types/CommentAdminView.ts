export interface CommentAdminView {
  id: string;
  content: string;
  answer: {
    id: string;
    content: string;
  };
  question: {
    id: string;
  }
  isHidden: boolean;
  votes: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    username: string;
    profilePicture: string;
  };
}
