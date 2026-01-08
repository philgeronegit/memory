import { beforeEach, describe, expect, it, vi } from "vitest";
import { RolesService } from "./service";

const rolesApiMock = {
  getRole: vi.fn().mockResolvedValue({
    id_role: 1,
    name: "Admin",
    role: "admin"
  }),
  getRoles: vi.fn().mockResolvedValue([
    {
      id_role: 1,
      name: "Admin",
      role: "admin"
    },
    {
      id_role: 2,
      name: "User",
      role: "user"
    },
    {
      id_role: 3,
      name: "Guest",
      role: "guest"
    }
  ])
};

describe("RolesService", () => {
  let rolesService: RolesService;

  beforeEach(() => {
    vi.clearAllMocks();
    rolesService = new RolesService(rolesApiMock);
  });

  it("should get a role by ID", async () => {
    const result = await rolesService.getTag(1);

    expect(rolesApiMock.getRole).toHaveBeenCalledWith(1);
    expect(result.id).toBe(1);
    expect(result.name).toBe("Admin");
    expect(result.role).toBe("admin");
  });

  it("should get all roles", async () => {
    const result = await rolesService.getRoles();

    expect(rolesApiMock.getRoles).toHaveBeenCalled();
    expect(result).toHaveLength(3);
    expect(result[0].name).toBe("Admin");
    expect(result[1].name).toBe("User");
    expect(result[2].name).toBe("Guest");
  });
});
