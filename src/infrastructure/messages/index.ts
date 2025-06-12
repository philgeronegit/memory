import MessagesApi from "./api";
import { MessagesService } from "./service";

const messagesService = new MessagesService(MessagesApi);

export default messagesService;
