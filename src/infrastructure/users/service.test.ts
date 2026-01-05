import { describe, expect, it, vitest } from "vitest";

import { UsersService } from "./service";

const usersApiMock = {
  login: vitest.fn().mockResolvedValue({
    id_user: 4,
    username: "John Doe",
    email: "john.doe@gmail.com",
    avatar_url: null,
    created_at: "2025-04-09 14:33:50",
    id_role: 6,
    role_name: "Admin",
    role_value: "admin"
  }),
  createUser: vitest.fn().mockResolvedValue({
    id_user: 4,
    username: "John Doe",
    email: "john.doe@gmail.com",
    avatar_url: null,
    created_at: "2025-04-09 14:33:50",
    id_role: 6,
    role_name: "Admin",
    role_value: "admin"
  }),
  updateUser: vitest.fn().mockResolvedValue({
    id_user: 4,
    username: "John Doe Updated",
    email: "john.doe@gmail.com",
    avatar_url: null,
    created_at: "2025-04-09 14:33:50",
    id_role: 6,
    role_name: "Admin",
    role_value: "admin"
  }),
  getUser: vitest.fn().mockResolvedValue({
    id_user: 4,
    username: "John Doe",
    email: "john.doe@gmail.com",
    avatar_url: null,
    created_at: "2025-04-09 14:33:50",
    id_role: 6,
    role_name: "Admin",
    role_value: "admin"
  }),
  getUsers: vitest.fn().mockResolvedValue([
    {
      id_user: 1,
      username: "John Doe",
      email: "john.doe@gmail.com",
      avatar_url: null,
      created_at: "2025-04-09 14:33:50",
      id_role: 6,
      role_name: "Admin",
      role_value: "admin"
    },
    {
      id_user: 2,
      username: "Jane Smith",
      email: "jane.smith@gmail.com",
      avatar_url: null,
      created_at: "2025-04-09 14:33:50",
      id_role: 6,
      role_name: "Admin",
      role_value: "admin"
    }
  ])
};

describe("UsersService", () => {
  it("should create a user", async () => {
    const usersService = new UsersService(usersApiMock);
    const input = {
      username: "John Doe",
      email: "john.doe@gmail.com",
      avatar_url: "https://example.com/avatar.jpg",
      is_admin: false,
      id_role: 6
    };
    const result = await usersService.createUser(input);

    expect(usersApiMock.createUser).toHaveBeenCalledWith(input);
    expect(result).toEqual({
      id: 4,
      username: "John Doe",
      email: "john.doe@gmail.com",
      avatarUrl: null,
      createdAt: "2025-04-09 14:33:50",
      isAdmin: undefined,
      idRole: 6,
      roleName: "Admin",
      roleValue: "admin"
    });
  });

  it("should update a user", async () => {
    const usersService = new UsersService(usersApiMock);
    const input = { id: 1, username: "John Doe Updated" };
    const result = await usersService.updateUser(input);

    expect(usersApiMock.updateUser).toHaveBeenCalledWith(input);
    expect(result).toEqual({
      id: 4,
      username: "John Doe Updated",
      email: "john.doe@gmail.com",
      avatarUrl: null,
      createdAt: "2025-04-09 14:33:50",
      isAdmin: undefined,
      idRole: 6,
      roleName: "Admin",
      roleValue: "admin"
    });
  });

  it("should get a user by ID", async () => {
    const usersService = new UsersService(usersApiMock);
    const result = await usersService.getUser(1);

    expect(usersApiMock.getUser).toHaveBeenCalledWith(1);
    expect(result).toEqual({
      id: 4,
      username: "John Doe",
      email: "john.doe@gmail.com",
      avatarUrl: null,
      createdAt: "2025-04-09 14:33:50",
      isAdmin: undefined,
      idRole: 6,
      roleName: "Admin",
      roleValue: "admin"
    });
  });

  it("should get all users", async () => {
    const usersService = new UsersService(usersApiMock);
    const result = await usersService.getUsers();

    expect(usersApiMock.getUsers).toHaveBeenCalled();
    expect(result).toEqual([
      {
        id: 1,
        username: "John Doe",
        email: "john.doe@gmail.com",
        avatarUrl: null,
        createdAt: "2025-04-09 14:33:50",
        isAdmin: undefined,
        idRole: 6,
        roleName: "Admin",
        roleValue: "admin"
      },
      {
        id: 2,
        username: "Jane Smith",
        email: "jane.smith@gmail.com",
        avatarUrl: null,
        createdAt: "2025-04-09 14:33:50",
        isAdmin: undefined,
        idRole: 6,
        roleName: "Admin",
        roleValue: "admin"
      }
    ]);
  });

  it("should login a user", async () => {
    const usersService = new UsersService(usersApiMock);
    const input = { username: "testuser", password: "password123" };
    const result = await usersService.login(input);

    expect(usersApiMock.login).toHaveBeenCalledWith(input);
    expect(result).toEqual({
      id: 4,
      username: "John Doe",
      email: "john.doe@gmail.com",
      avatarUrl: null,
      createdAt: "2025-04-09 14:33:50",
      isAdmin: undefined,
      idRole: 6,
      roleName: "Admin",
      roleValue: "admin"
    });
  });
  it("should throw an error if login fails", async () => {
    usersApiMock.login.mockRejectedValue(new Error("Login failed"));
    const usersService = new UsersService(usersApiMock);
    const input = { username: "wronguser", password: "wrongpassword" };

    await expect(usersService.login(input)).rejects.toThrow("Login failed");
  });
});
