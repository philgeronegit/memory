import { Comment } from "@/domain";
import { CommentDto } from "./dto";

export function dtoToComment(dto: CommentDto): Comment {
  return {
    id: dto.id_comment,
    content: dto.content,
    username: dto.username,
    email: dto.email,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at ?? null
  };
}
