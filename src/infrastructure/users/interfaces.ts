import { UserDto } from "./dto";

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  avatar_url: string;
  is_admin: boolean;
  id_role: number;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface UpdateUserInput {
  id: number;
  username?: string;
  email?: string;
  avatar_url?: string;
  is_admin?: boolean;
  id_role?: number;
}

export interface UsersApi {
  login: (input: LoginInput) => Promise<UserDto>;
  updateUser: (input: UpdateUserInput) => Promise<UserDto>;
  getUser: (id: number) => Promise<UserDto>;
  getUsers: () => Promise<UserDto[]>;
}
