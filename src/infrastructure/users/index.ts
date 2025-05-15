import UsersApi from "./api";
import { UsersService } from "./service";

const usersService = new UsersService(UsersApi);

export default usersService;
