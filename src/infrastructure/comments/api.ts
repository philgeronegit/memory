import { apiClient } from "../client";
import { CommentDto } from "./dto";
import {
  CreateCommentInput,
  UpdateCommentInput,
  UpdateCommentScoreInput
} from "./interfaces";

async function createComment(input: CreateCommentInput) {
  const response = await apiClient.post<CommentDto>("/comment", input);
  return response.data;
}

async function deleteComment(id: number) {
  await apiClient.delete(`/comment/${id}`);
}

async function updateComment(input: UpdateCommentInput) {
  const response = await apiClient.put<CommentDto>(
    `/comment/${input.id}`,
    input
  );
  return response.data;
}

async function updateCommentScore(input: UpdateCommentScoreInput) {
  const response = await apiClient.put<CommentDto>(
    `/comment/${input.id}/score`,
    input
  );
  return response.data;
}

async function getComments(noteId?: number) {
  if (!noteId) {
    return Promise.resolve([]);
  }

  const response = await apiClient.get<CommentDto[]>(`/note/${noteId}/comment`);
  return response.data;
}

const api = {
  createComment,
  deleteComment,
  getComments,
  updateComment,
  updateCommentScore
};

export default api;
