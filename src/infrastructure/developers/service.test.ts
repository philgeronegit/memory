import { beforeEach, describe, expect, it, vi } from "vitest";
import { DevelopersService } from "./service";

const developersApiMock = {
  getDeveloper: vi.fn().mockResolvedValue({
    id_user: 1,
    username: "Test Developer",
    email: "dev@example.com",
    avatar_url: "https://example.com/avatar.jpg",
    created_at: new Date("2025-01-01T10:00:00Z"),
    is_admin: false,
    id_role: 1,
    role_name: "Developer",
    role_value: "developer",
    access_token: "",
    expires_in: 0
  }),
  getDevelopers: vi.fn().mockResolvedValue([
    {
      id_user: 1,
      username: "Developer 1",
      email: "dev1@example.com",
      avatar_url: "https://example.com/avatar1.jpg",
      created_at: new Date("2025-01-01T10:00:00Z"),
      is_admin: false,
      id_role: 1,
      role_name: "Developer",
      role_value: "developer",
      access_token: "",
      expires_in: 0
    },
    {
      id_user: 2,
      username: "Developer 2",
      email: "dev2@example.com",
      avatar_url: "https://example.com/avatar2.jpg",
      created_at: new Date("2025-01-02T11:00:00Z"),
      is_admin: false,
      id_role: 1,
      role_name: "Developer",
      role_value: "developer",
      access_token: "",
      expires_in: 0
    }
  ]),
  updateDeveloper: vi.fn().mockResolvedValue({
    id_user: 1,
    username: "Updated Developer",
    email: "dev@example.com",
    avatar_url: "https://example.com/avatar.jpg",
    created_at: new Date("2025-01-01T10:00:00Z"),
    is_admin: false,
    id_role: 1,
    role_name: "Developer",
    role_value: "developer",
    access_token: "",
    expires_in: 0
  })
};

describe("DevelopersService", () => {
  let developersService: DevelopersService;

  beforeEach(() => {
    vi.clearAllMocks();
    developersService = new DevelopersService(developersApiMock);
  });

  it("should get a developer by ID", async () => {
    const result = await developersService.getDeveloper(1);

    expect(developersApiMock.getDeveloper).toHaveBeenCalledWith(1);
    expect(result.id).toBe(1);
    expect(result.username).toBe("Test Developer");
  });

  it("should get all developers", async () => {
    const result = await developersService.getDevelopers();

    expect(developersApiMock.getDevelopers).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result[0].username).toBe("Developer 1");
    expect(result[1].username).toBe("Developer 2");
  });

  it("should update a developer", async () => {
    const input = {
      id: 1,
      username: "Updated Developer"
    };

    const result = await developersService.updateDeveloper(input);

    expect(developersApiMock.updateDeveloper).toHaveBeenCalledWith(input);
    expect(result.username).toBe("Updated Developer");
  });
});
