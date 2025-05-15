import { CommentDto } from "./dto";

export interface CommentsApi {
  createComment: (input: CreateCommentInput) => Promise<CommentDto>;
  deleteComment: (id: number) => Promise<void>;
  getComments: (noteId?: number) => Promise<CommentDto[]>;
  updateComment: (input: UpdateCommentInput) => Promise<CommentDto>;
  updateCommentScore: (input: UpdateCommentScoreInput) => Promise<CommentDto>;
}

export interface CreateCommentInput {
  id_user: number;
  id_item: number;
  content: string;
}

export interface UpdateCommentInput {
  id: number;
  content: string;
  like_count?: number;
  dislike_count?: number;
  user_id?: number;
  score?: number;
}

export interface UpdateCommentScoreInput {
  id: number;
  user_id: number;
  score: number;
}
