import { RolesApi } from "./interfaces";
import { dtoToRole } from "./transform";

export class RolesService {
  constructor(private api: RolesApi) {
    this.api = api;
  }

  async getTag(id: number) {
    const role = await this.api.getRole(id);
    return dtoToRole(role);
  }

  async getRoles() {
    const roles = await this.api.getRoles();
    return roles.map(dtoToRole);
  }
}
