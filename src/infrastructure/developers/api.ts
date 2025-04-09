import { apiClient } from "../client";
import { DeveloperDto, UpdateDeveloperInput } from "./dto";

async function updateDeveloper(input: UpdateDeveloperInput) {
  const response = await apiClient.put<DeveloperDto>(
    `/developer/${input.id}`,
    input
  );
  return response.data;
}

async function getDeveloper(id: number) {
  const response = await apiClient.get<DeveloperDto>(`/developer/${id}`);
  return response.data;
}

async function getDevelopers() {
  const response = await apiClient.get<DeveloperDto[]>("/developer");
  return response.data;
}

const api = { getDeveloper, getDevelopers, updateDeveloper };

export default api;
