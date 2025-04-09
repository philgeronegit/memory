import { Developer } from "@/domain";
import { DeveloperDto } from "./dto";

export function dtoToDeveloper(dto: DeveloperDto): Developer {
  return {
    id: dto.id_user,
    username: dto.username,
    email: dto.email,
    avatarUrl: dto.avatar_url,
    createdAt: dto.created_at,
    isAdmin: dto.is_admin,
    idRole: dto.id_role,
    role: dto.role
  };
}
