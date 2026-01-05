import { Comment } from "@/domain/comment";
import { CommentDto } from "./dto";

export function dtoToComment(dto: CommentDto): Comment {
  return {
    id: dto.id_comment,
    content: dto.content,
    userId: dto.id_user,
    username: dto.username,
    email: dto.email,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at ?? null,
    score: dto.score,
    totalLikes: dto.total_likes,
    totalDislikes: dto.total_dislikes
  };
}
