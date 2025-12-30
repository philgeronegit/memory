import { Message } from "@/domain/message";
import { MessageDto } from "./dto";

export function dtoToMessage(dto: MessageDto): Message {
  return {
    id: dto.id_message,
    userId: dto.id_user,
    text: dto.text,
    createdAt: new Date(dto.created_at),
    readAt: dto.read_at ? new Date(dto.read_at) : undefined
  };
}
