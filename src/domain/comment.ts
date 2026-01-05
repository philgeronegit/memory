export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string | null;
  userId: number;
  username: string;
  email: string;
  score: number;
  totalLikes: number;
  totalDislikes: number;
}
