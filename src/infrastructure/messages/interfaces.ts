import { MessageDto } from "./dto";

export interface CreateMessageInput {
  text: string;
  userId: number;
}

export interface UpdateMessageInput {
  id: number;
  text: string;
}

export interface UpdateMessageForUserInput {
  id: number;
  userId: number;
  readAt: Date | null;
}

export interface MessagesApi {
  createMessage: (input: CreateMessageInput) => Promise<MessageDto>;
  getMessage: (id: number) => Promise<MessageDto>;
  getMessages: () => Promise<MessageDto[]>;
  getUserMessages: (userId: number) => Promise<MessageDto[]>;
  updateMessage: (input: UpdateMessageInput) => Promise<MessageDto>;
  updateMessageForUser: (input: UpdateMessageForUserInput) => Promise<MessageDto>;
}
