import { apiClient } from "../client";
import { TaskDto, UpdateTaskInput } from "./dto";

async function getTask(id: number) {
  const response = await apiClient.get<TaskDto>(`/task/${id}`);
  return response.data;
}

async function getTasks() {
  const response = await apiClient.get<TaskDto[]>("/task");
  return response.data;
}

async function updateTask(input: UpdateTaskInput) {
  const response = await apiClient.put<TaskDto>(`/task/${input.id}`, input);
  return response.data;
}

const api = { getTask, getTasks, updateTask };

export default api;
