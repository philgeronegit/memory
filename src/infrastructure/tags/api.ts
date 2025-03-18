import { apiClient } from "../client";
import { CreateTagInput, TagDto } from "./dto";

async function createTag(input: CreateTagInput) {
  const response = await apiClient.post<TagDto>("/tag", input);
  return response.data;
}

async function updateTag(id: number, input: CreateTagInput) {
  const response = await apiClient.put<TagDto>(`/tag/${id}`, input);
  return response.data;
}

async function getTag(id: number) {
  const response = await apiClient.get<TagDto>(`/tag/${id}`);
  return response.data;
}

async function getTags() {
  const response = await apiClient.get<TagDto[]>("/tag");
  return response.data;
}

const api = { createTag, getTag, getTags, updateTag };

export default api;
