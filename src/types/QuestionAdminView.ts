export interface QuestionAdminView {
  id: string;
  title: string;
  tags: {
    id: string;
    name: string;
  }[];
  views: number;
  votes: number; // tổng bình chọn: upvote - downvote
  answers: number;
  user: {
    id: string;
    username: string;
  };
  isHidden: boolean;
  isAnswered: boolean;
  createdAt: string;
  editedAt: string;
}
