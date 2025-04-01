export default interface MemberProfile {
  username: string;
  avatar: string;
  bio: string;
  github: string;
  showGithub: boolean;
  featuredQuestions: PostPreview[];
  featuredAnswers: PostPreview[];
  questions: number;
  answers: number;
  upvotesReceived: number;
  interestTags: InterestTags[];
  joinedOn: string; // ISO date string
}

export interface PostPreview {
  id: string;
  questionTitle: string;
  upvotes: number;
  isSolved: boolean;
  postedOn: string; // ISO date string
}

export interface InterestTags {
  id: string;
  name: string;
  upvotes: number;
  contributions: number;
}
