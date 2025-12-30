import { apiClient } from "../client";
import { UserDto } from "./dto";
import {
  CreateUserInput,
  LoginInput,
  UpdatePasswordInput,
  UpdateUserInput
} from "./interfaces";

async function createUser(input: CreateUserInput) {
  const response = await apiClient.post<UserDto>("/user", input);
  return response.data;
}

async function deleteUser(id: number) {
  await apiClient.delete(`/user/${id}`);
}

async function getProjectUsers(projectId?: number) {
  const response = await apiClient.get<UserDto[]>(`/project/${projectId}/user`);
  return response.data;
}


async function getUser(id: number) {
  const response = await apiClient.get<UserDto>(`/user/${id}`);
  return response.data;
}

async function getUsers() {
  const response = await apiClient.get<UserDto[]>("/user");
  return response.data;
}

async function login(input: LoginInput) {
  const response = await apiClient.post<UserDto>("/login", input);
  return response.data;
}

async function updatePassword(input: UpdatePasswordInput) {
  await apiClient.put(`/login/${input.id}`, { password: input.password });
}

async function updateUser(input: UpdateUserInput) {
  const response = await apiClient.put<UserDto>(`/user/${input.id}`, input);
  return response.data;
}

const api = {
  createUser,
  deleteUser,
  getProjectUsers,
  getUser,
  getUsers,
  login,
  updatePassword,
  updateUser
};

export default api;
