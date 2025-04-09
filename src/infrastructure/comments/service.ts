import { CreateCommentInput, UpdateCommentInput } from "./dto";
import { CommentsApi } from "./interfaces";
import { dtoToComment } from "./transform";

export class CommentsService {
  constructor(private api: CommentsApi) {
    this.api = api;
  }

  async createComment(input: CreateCommentInput) {
    const comment = await this.api.createComment(input);
    return dtoToComment(comment);
  }

  async updateComment(input: UpdateCommentInput) {
    const comment = await this.api.updateComment(input);
    return dtoToComment(comment);
  }

  async getComments(noteId?: number) {
    const comments = await this.api.getComments(noteId);
    return comments.map(dtoToComment);
  }
}
