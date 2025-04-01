export default interface Tag {
  id: string;
  name: string;
  description: string;
  questionsThisWeek: number;
  questionsToday: number;
  questionsAllTime: number;
}
