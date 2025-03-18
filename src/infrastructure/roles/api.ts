import { apiClient } from "../client";
import { RoleDto } from "./dto";

async function getRole(id: number) {
  const response = await apiClient.get<RoleDto>(`/role/${id}`);
  return response.data;
}

async function getRoles() {
  const response = await apiClient.get<RoleDto[]>("/role");
  return response.data;
}

const api = { getRole, getRoles };

export default api;
