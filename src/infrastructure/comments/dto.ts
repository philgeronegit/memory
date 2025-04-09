export interface CommentDto {
  id_comment: number;
  content: string;
  created_at: string;
  updated_at: string | null;
  username: string;
  email: string;
}

export interface CreateCommentInput {
  id_user: number;
  id_item: number;
  content: string;
}

export interface UpdateCommentInput {
  id: number;
  content: string;
}
