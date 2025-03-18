import rolesApi from "./api";
import { RolesService } from "./service";

const rolesService = new RolesService(rolesApi);

export default rolesService;
