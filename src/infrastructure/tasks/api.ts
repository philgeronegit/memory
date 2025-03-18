import { apiClient } from "../client";
import { TaskDto } from "./dto";

async function getTask(id: number) {
  const response = await apiClient.get<TaskDto>(`/task/${id}`);
  return response.data;
}

async function getTasks() {
  const response = await apiClient.get<TaskDto[]>("/task");
  return response.data;
}

const api = { getTask, getTasks };

export default api;
