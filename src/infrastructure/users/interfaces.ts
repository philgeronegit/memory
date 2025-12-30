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

export interface UpdatePasswordInput {
  id: number;
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
  createUser: (input: CreateUserInput) => Promise<UserDto>;
  deleteUser: (id: number) => Promise<void>;
  getProjectUsers: (projectId?: number) => Promise<UserDto[]>;
  getUser: (id: number) => Promise<UserDto>;
  getUsers: () => Promise<UserDto[]>;
  login: (input: LoginInput) => Promise<UserDto>;
  updatePassword: (input: UpdatePasswordInput) => Promise<void>;
  updateUser: (input: UpdateUserInput) => Promise<UserDto>;
}
