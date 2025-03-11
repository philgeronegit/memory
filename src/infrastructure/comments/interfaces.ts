import { CommentDto } from "./dto";

export interface CommentsApi {
  getComments: (noteId?: number) => Promise<CommentDto[]>;
}
