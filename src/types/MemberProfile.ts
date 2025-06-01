import { Tag } from '@/pages/EditQuestion/services';

export default interface Profile {
  info: {
    id: string;
    username: string;
    avatar: string;
    github?: string;
    bio: string;
  };
  stats: {
    questions: number;
    answers: number;
    upvotesReceived: number;
    joinedOn: string; // ISO date string
  };
  questions: PostPreview[];
  answers: PostPreview[];
  interestTags: InterestTags[];
}

export interface PostPreview {
  id: string;
  questionId?: string;
  questionTitle: string;
  upvotes: number;
  tags: Tag[];
  // isSolved: boolean;
  postedOn: string; // ISO date string
}

export interface InterestTags {
  id: string;
  name: string;
  upvotes: number;
  contributions: number;
}
