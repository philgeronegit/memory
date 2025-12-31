import { apiClient } from "../client";
import { CreateProjectInput, ProjectDto, UpdateProjectInput } from "./dto";
import {
  AddUserToProjectInput,
  DeleteUserFromProjectInput
} from "./user-project-dto";

async function addUserToProject(input: AddUserToProjectInput) {
  await apiClient.post(`/user/${input.userId}/project/${input.projectId}`);
}

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

async function deleteUserFromProject(input: DeleteUserFromProjectInput) {
  await apiClient.delete(`/user/${input.userId}/project/${input.projectId}`);
}

async function getProject(id?: number) {
  const response = await apiClient.get<ProjectDto>(`/project/${id}`);
  return response.data;
}

async function getProjects() {
  const response = await apiClient.get<ProjectDto[]>("/project");
  return response.data;
}

async function getUserProjects(userId?: number) {
  const response = await apiClient.get<ProjectDto[]>(`/user/${userId}/project`);
  return response.data;
}

const api = {
  addUserToProject,
  createProject,
  deleteProject,
  deleteUserFromProject,
  getProject,
  getProjects,
  getUserProjects,
  updateProject
};

export default api;
