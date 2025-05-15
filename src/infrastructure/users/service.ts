import { LoginInput, UpdateUserInput, UsersApi } from "./interfaces";
import { dtoToUser } from "./transform";

export class UsersService {
  constructor(private api: UsersApi) {
    this.api = api;
  }

  async login(input: LoginInput) {
    const user = await this.api.login(input);
    return dtoToUser(user);
  }

  async getUser(id: number) {
    const user = await this.api.getUser(id);
    return dtoToUser(user);
  }

  async getUsers() {
    const users = await this.api.getUsers();
    return users.map(dtoToUser);
  }

  async updateUser(input: UpdateUserInput) {
    const user = await this.api.updateUser(input);
    return dtoToUser(user);
  }
}
