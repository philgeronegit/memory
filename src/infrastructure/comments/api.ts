import { apiClient } from "../client";
import { CommentDto } from "./dto";

async function getComments(noteId?: string) {
  if (!noteId) {
    return Promise.resolve([]);
  }

  const response = await apiClient.get<CommentDto[]>(`/comment/${noteId}`);
  return response.data;
}

const api = { getComments };

export default api;
