import { CommentDto, CreateCommentInput, UpdateCommentInput } from "./dto";

export interface CommentsApi {
  createComment: (input: CreateCommentInput) => Promise<CommentDto>;
  updateComment: (input: UpdateCommentInput) => Promise<CommentDto>;
  getComments: (noteId?: number) => Promise<CommentDto[]>;
}
