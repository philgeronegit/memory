import { apiClient } from "../client";
import { MessageDto } from "./dto";
import { UpdateMessageInput } from "./interfaces";

async function getMessage(id: number) {
  const response = await apiClient.get<MessageDto>(`/message/${id}`);
  return response.data;
}

async function getMessages() {
  const response = await apiClient.get<MessageDto[]>("/message");
  return response.data;
}

async function getUserMessages(userId: number) {
  const response = await apiClient.get<MessageDto[]>(`/user/${userId}/message`);
  return response.data;
}

async function updateMessage(input: UpdateMessageInput) {
  const response = await apiClient.put<MessageDto>(
    `/message/${input.id}`,
    input
  );
  return response.data;
}

const api = { getMessage, getMessages, getUserMessages, updateMessage };

export default api;
