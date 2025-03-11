import { apiClient } from "../client";
import { ProjectDto } from "./dto";

async function getProject(id: number) {
  const response = await apiClient.get<ProjectDto>(`/project/${id}`);
  return response.data;
}

async function getProjects() {
  const response = await apiClient.get<ProjectDto[]>("/project");
  return response.data;
}

const api = { getProject, getProjects };

export default api;
