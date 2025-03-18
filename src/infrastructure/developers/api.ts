import { apiClient } from "../client";
import { DeveloperDto } from "./dto";

async function getDeveloper(id: number) {
  const response = await apiClient.get<DeveloperDto>(`/developer/${id}`);
  return response.data;
}

async function getDevelopers() {
  const response = await apiClient.get<DeveloperDto[]>("/developer");
  return response.data;
}

const api = { getDeveloper, getDevelopers };

export default api;
