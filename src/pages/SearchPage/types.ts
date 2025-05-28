export interface Question {
  id: string;
  title: string;
  content: string;
  author: string;
  views: number;
  upvotes: number;
  answers: number;
  isSolved: boolean;
  tags: string[];
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
  questionsCount: number;
  descriptionVi: string;
  descriptionEn: string;
}

export interface User {
  id: string;
  username: string;
  profilePicture: string;
  bio: string;
  questionsCount: number;
  answersCount: number;
  reputation: number;
}

export interface MockResults {
  questions: Question[];
  tags: Tag[];
  users: User[];
}

export type TabValue = 0 | 1 | 2 | 3;
