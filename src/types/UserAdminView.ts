export interface UserAdminView {
  id: string;
  username: string;
  avatar: string;
  joinedOn: string;
  role: "ADMIN" | "MEMBER";
  isBanned: boolean;
  reputation: {
    questions: number;
    answers: number;
    comments: number;
    total: number;
  };
  contribution: {
    questions: number;
    answers: number;
    comments: number;
    reports: number;
    total: number;
  };
}
