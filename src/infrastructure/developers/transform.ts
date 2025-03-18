import { Developer } from "@/domain";
import { DeveloperDto } from "./dto";

export function dtoToDeveloper(dto: DeveloperDto): Developer {
  return {
    id: dto.id_developer,
    username: dto.username,
    email: dto.email,
    avatarUrl: dto.avatar_url,
    createdAt: dto.created_at,
    isAdmin: dto.is_admin,
    role: dto.role
  };
}
