import {
  CreateUserInput,
  LoginInput,
  UpdatePasswordInput,
  UpdateUserInput,
  UsersApi
} from "./interfaces";
import { dtoToUser } from "./transform";

export class UsersService {
  constructor(private api: UsersApi) {
    this.api = api;
  }


  async createUser(input: CreateUserInput) {
    const user = await this.api.createUser(input);
    return dtoToUser(user);
  }

  async deleteUser(id: number) {
    await this.api.deleteUser(id);
  }

  async getProjectUsers(projectId?: number) {
    const users = await this.api.getProjectUsers(projectId);
    return users.map(dtoToUser);
  }

  async getUser(id: number) {
    const user = await this.api.getUser(id);
    return dtoToUser(user);
  }

  async getUsers() {
    const users = await this.api.getUsers();
    return users.map(dtoToUser);
  }

  async login(input: LoginInput) {
    const user = await this.api.login(input);
    return dtoToUser(user);
  }

  async updatePassword(input: UpdatePasswordInput) {
    await this.api.updatePassword(input);
  }

  async updateUser(input: UpdateUserInput) {
    const user = await this.api.updateUser(input);
    return dtoToUser(user);
  }
}
