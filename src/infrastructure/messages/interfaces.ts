import { MessageDto } from "./dto";

export interface CreateMessageInput {
  text: string;
}

export interface UpdateMessageInput {
  id: number;
  text: string;
}

export interface MessagesApi {
  getMessage: (id: number) => Promise<MessageDto>;
  getMessages: () => Promise<MessageDto[]>;
  getUserMessages: (userId: number) => Promise<MessageDto[]>;
  updateMessage: (input: UpdateMessageInput) => Promise<MessageDto>;
}
