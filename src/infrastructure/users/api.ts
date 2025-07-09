import { apiClient } from "../client";
import { UserDto } from "./dto";
import { LoginInput, UpdateUserInput } from "./interfaces";

async function createUser(input: UpdateUserInput) {
  const response = await apiClient.post<UserDto>("/user", input);
  return response.data;
}

async function updateUser(input: UpdateUserInput) {
  const response = await apiClient.put<UserDto>(`/user/${input.id}`, input);
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

const api = { createUser, getUser, getUsers, login, updateUser };

export default api;
