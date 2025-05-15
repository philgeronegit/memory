import { apiClient } from "../client";
import { TagDto } from "./dto";
import {
  CreateNoteTagInput,
  CreateTagInput,
  DeleteNoteTagInput,
  UpdateNoteTagInput
} from "./service";

async function createTag(input: CreateTagInput) {
  const response = await apiClient.post<TagDto>("/tag", input);
  return response.data;
}

async function createNoteTag(input: CreateNoteTagInput) {
  const response = await apiClient.post<TagDto>(
    `/note/${input.idNote}/tag/${input.idTag}`,
    input
  );
  return response.data;
}

async function updateNoteTag(input: UpdateNoteTagInput) {
  console.log("🚀 ~ updateNoteTag ~ input:", input);
  // const ids = input.tagIds.join(",");
  const response = await apiClient.put<TagDto>(
    `/note/${input.idNote}/tag`,
    input
  );
  return response.data;
}

async function updateTag(id: number, input: CreateTagInput) {
  const response = await apiClient.put<TagDto>(`/tag/${id}`, input);
  return response.data;
}

async function deleteTag(id: number) {
  await apiClient.delete(`/tag/${id}`);
}

async function deleteNoteTag(input: DeleteNoteTagInput) {
  await apiClient.delete(`/note/${input.idNote}/tag/${input.idTag}`);
}

async function getTag(id: number) {
  const response = await apiClient.get<TagDto>(`/tag/${id}`);
  return response.data;
}

async function getNoteTags(noteId?: number) {
  if (!noteId) {
    return Promise.resolve([]);
  }

  const response = await apiClient.get<TagDto[]>(`/note/${noteId}/tag`);
  return response.data;
}

async function getTags() {
  const response = await apiClient.get<TagDto[]>("/tag");
  return response.data;
}

const api = {
  createNoteTag,
  createTag,
  getNoteTags,
  deleteTag,
  deleteNoteTag,
  getTag,
  getTags,
  updateTag,
  updateNoteTag
};

export default api;
