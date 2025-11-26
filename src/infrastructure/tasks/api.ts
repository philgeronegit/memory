import { apiClient } from "../client";
import {
  BulkUpdateTaskOrderInput,
  CreateTaskInput,
  TaskDto,
  UpdateTaskInput
} from "./dto";

async function bulkUpdateTaskOrder(input: BulkUpdateTaskOrderInput) {
  const response = await apiClient.put<TaskDto[]>("/task/order", input);
  return response.data;
}

async function createTask(input: CreateTaskInput) {
  const response = await apiClient.post<TaskDto>("/task", input);
  return response.data;
}

async function getTask(id: number) {
  const response = await apiClient.get<TaskDto>(`/task/${id}`);
  return response.data;
}

async function getTasks() {
  const response = await apiClient.get<TaskDto[]>("/task");
  return response.data;
}

async function getUserTasks(userId?: number) {
  const response = await apiClient.get<TaskDto[]>(`/user/${userId}/task`);
  return response.data;
}

async function updateTask(input: UpdateTaskInput) {
  const response = await apiClient.put<TaskDto>(`/task/${input.id}`, input);
  return response.data;
}

const api = {
  bulkUpdateTaskOrder,
  createTask,
  getTask,
  getTasks,
  getUserTasks,
  updateTask,
};

export default api;
