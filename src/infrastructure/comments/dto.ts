export interface CommentDto {
  id_comment: number;
  content: string;
  created_at: string;
  updated_at: string | null;
  username: string;
  email: string;
}
