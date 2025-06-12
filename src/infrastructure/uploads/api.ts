import { apiClient } from "../client";
import { UploadDto } from "./dto";

async function getUserUploads(userId: number) {
  const response = await apiClient.get<UploadDto[]>(`/user/${userId}/upload`);
  return response.data;
}

const api = { getUserUploads };

export default api;
