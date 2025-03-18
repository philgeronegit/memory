import { RoleDto } from "./dto";

export interface RolesApi {
  getRole: (id: number) => Promise<RoleDto>;
  getRoles: () => Promise<RoleDto[]>;
}
