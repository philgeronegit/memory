import { BaseUser, User } from "@/domain/user";
import { UserDto } from "./dto";

export function dtoToBaseUser(dto: UserDto): BaseUser {
  return {
    id: dto.id_user,
    username: dto.username
  };
}

export function dtoToUser(dto: UserDto): User {
  return {
    id: dto.id_user,
    username: dto.username,
    email: dto.email,
    avatarUrl: dto.avatar_url,
    createdAt: dto.created_at,
    isAdmin: dto.is_admin,
    idRole: dto.id_role,
    roleName: dto.role_name,
    roleValue: dto.role_value,
    access_token: dto.access_token,
    expires_in: dto.expires_in
  };
}
