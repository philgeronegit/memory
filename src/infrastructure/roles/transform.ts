import { Role } from "@/domain/role";
import { RoleDto } from "./dto";

export function dtoToRole(dto: RoleDto): Role {
  return {
    id: dto.id_role,
    name: dto.name
  };
}
