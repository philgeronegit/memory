import usersApi from "./api";
import { UsersService } from "./service";

const usersService = new UsersService(usersApi);

export default usersService;
