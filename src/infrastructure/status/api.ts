import { apiClient } from "../client";
import { StatusDto } from "./dto";

async function getStatuses() {
  const response = await apiClient.get<StatusDto[]>("/status");
  return response.data;
}

const api = {
  getStatuses
};

export default api;
