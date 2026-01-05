import { CreateMessageInput, MessagesApi, UpdateMessageForUserInput, UpdateMessageInput } from "./interfaces";
import { dtoToMessage } from "./transform";

export class MessagesService {
  constructor(private api: MessagesApi) {
    this.api = api;
  }

  async createMessage(input: CreateMessageInput) {
    const message = await this.api.createMessage(input);
    return dtoToMessage(message);
  }

  async getMessage(id: number) {
    const message = await this.api.getMessage(id);
    return dtoToMessage(message);
  }

  async getUserMessages(userId?: number) {
    if (!userId) {
      return [];
    }
    const messages = await this.api.getUserMessages(userId);
    return messages.map(dtoToMessage);
  }

  async getMessages() {
    const messages = await this.api.getMessages();
    return messages.map(dtoToMessage);
  }

  async updateMessage(input: UpdateMessageInput) {
    const message = await this.api.updateMessage(input);
    return dtoToMessage(message);
  }

  async updateMessageForUser(input: UpdateMessageForUserInput) {
    const message = await this.api.updateMessageForUser(input);
    return dtoToMessage(message);
  }
}
