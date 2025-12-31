import { apiClient } from "../client";
import { MessageDto } from "./dto";
import { CreateMessageInput, UpdateMessageForUserInput, UpdateMessageInput } from "./interfaces";

async function createMessage(input: CreateMessageInput) {
  const response = await apiClient.post<MessageDto>("/message", {
    text: input.text,
    id_user: input.userId
  });
  return response.data;
}

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

async function updateMessageForUser(input: UpdateMessageForUserInput) {
  const response = await apiClient.put<MessageDto>(
    `/user/${input.userId}/message/${input.id}`,
    { "read_at": input.readAt ? input.readAt.toISOString() : null }
  );
  return response.data;
}

const api = { createMessage, getMessage, getMessages, getUserMessages, updateMessage, updateMessageForUser };

export default api;
