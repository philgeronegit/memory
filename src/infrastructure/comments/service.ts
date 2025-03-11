import { CommentsApi } from "./interfaces";
import { dtoToComment } from "./transform";

export class CommentsService {
  constructor(private api: CommentsApi) {
    this.api = api;
  }

  async getComments(noteId?: number) {
    const comments = await this.api.getComments(noteId);
    return comments.map(dtoToComment);
  }
}
