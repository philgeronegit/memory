import { apiClient } from "../client";
import { CommentDto, CreateCommentInput, UpdateCommentInput } from "./dto";

async function createComment(input: CreateCommentInput) {
  const response = await apiClient.post<CommentDto>("/comment", input);
  return response.data;
}

async function updateComment(input: UpdateCommentInput) {
  const response = await apiClient.put<CommentDto>(
    `/comment/${input.id}`,
    input
  );
  return response.data;
}

async function getComments(noteId?: string) {
  if (!noteId) {
    return Promise.resolve([]);
  }

  const response = await apiClient.get<CommentDto[]>(`/note/${noteId}/comment`);
  return response.data;
}

const api = { createComment, getComments, updateComment };

export default api;
