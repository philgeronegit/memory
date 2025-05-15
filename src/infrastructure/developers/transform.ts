import { Developer } from "@/domain/developer";
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
    roleName: dto.role_name,
    roleValue: dto.role_value
  };
}
