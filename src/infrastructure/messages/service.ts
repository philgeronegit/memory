import { MessagesApi, UpdateMessageInput } from "./interfaces";
import { dtoToMessage } from "./transform";

export class MessagesService {
  constructor(private api: MessagesApi) {
    this.api = api;
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
}
