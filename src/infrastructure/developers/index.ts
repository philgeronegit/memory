import DevelopersApi from "./api";
import { DevelopersService } from "./service";

const developersService = new DevelopersService(DevelopersApi);

export default developersService;
