import { apiClient } from "../client";
import { CreateProjectInput, ProjectDto, UpdateProjectInput } from "./dto";

async function createProject(input: CreateProjectInput) {
  const response = await apiClient.post<ProjectDto>("/project", input);
  return response.data;
}

async function updateProject(input: UpdateProjectInput) {
  const response = await apiClient.put<ProjectDto>(
    `/project/${input.id}`,
    input
  );
  return response.data;
}

async function deleteProject(id: number) {
  await apiClient.delete(`/project/${id}`);
}

async function getProject(id: number) {
  const response = await apiClient.get<ProjectDto>(`/project/${id}`);
  return response.data;
}

async function getProjects() {
  const response = await apiClient.get<ProjectDto[]>("/project");
  return response.data;
}

const api = {
  createProject,
  updateProject,
  deleteProject,
  getProject,
  getProjects
};

export default api;
