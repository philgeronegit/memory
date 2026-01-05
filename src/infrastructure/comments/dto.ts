export interface CommentDto {
  id_comment: number;
  content: string;
  created_at: string;
  updated_at: string | null;
  id_user: number;
  username: string;
  email: string;
  score: number;
  total_likes: number;
  total_dislikes: number;
}
