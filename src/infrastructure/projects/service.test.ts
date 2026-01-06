import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProjectsService } from "./service";

const projectsApiMock = {
  addUserToProject: vi.fn().mockResolvedValue(undefined),
  createProject: vi.fn().mockResolvedValue({
    id_project: 1,
    name: "Test Project",
    description: "Test description",
    access_type: "owner",
    created_at: "2025-01-01 10:00:00",
    updated_at: null,
    archived_at: null,
    created_by_id: 1,
    created_by_name: "Test User",
    id_users: null,
    users: null,
    users_json: null,
    id_notes: null
  }),
  deleteProject: vi.fn().mockResolvedValue(undefined),
  deleteUserFromProject: vi.fn().mockResolvedValue(undefined),
  getProject: vi.fn().mockResolvedValue({
    id_project: 1,
    name: "Test Project",
    description: "Test description",
    access_type: "owner",
    created_at: "2025-01-01 10:00:00",
    updated_at: null,
    archived_at: null,
    created_by_id: 1,
    created_by_name: "Test User",
    id_users: null,
    users: null,
    users_json: null,
    id_notes: null
  }),
  getProjects: vi.fn().mockResolvedValue([
    {
      id_project: 1,
      name: "Project 1",
      description: "Description 1",
      access_type: "owner",
      created_at: "2025-01-01 10:00:00",
      updated_at: null,
      archived_at: null,
      created_by_id: 1,
      created_by_name: "User 1",
      id_users: null,
      users: null,
      users_json: null,
      id_notes: null
    },
    {
      id_project: 2,
      name: "Project 2",
      description: "Description 2",
      access_type: "owner",
      created_at: "2025-01-02 11:00:00",
      updated_at: null,
      archived_at: null,
      created_by_id: 2,
      created_by_name: "User 2",
      id_users: null,
      users: null,
      users_json: null,
      id_notes: null
    }
  ]),
  getUserProjects: vi.fn().mockResolvedValue([]),
  updateProject: vi.fn().mockResolvedValue({
    id_project: 1,
    name: "Updated Project",
    description: "Updated description",
    access_type: "owner",
    created_at: "2025-01-01 10:00:00",
    updated_at: "2025-01-03 10:00:00",
    archived_at: null,
    created_by_id: 1,
    created_by_name: "Test User",
    id_users: null,
    users: null,
    users_json: null,
    id_notes: null
  })
};

describe("ProjectsService", () => {
  let projectsService: ProjectsService;

  beforeEach(() => {
    vi.clearAllMocks();
    projectsService = new ProjectsService(projectsApiMock);
  });

  it("should add user to project", async () => {
    const input = { id_project: 1, id_user: 2 };
    await projectsService.addUserToProject(input);

    expect(projectsApiMock.addUserToProject).toHaveBeenCalledWith(input);
  });

  it("should create a project", async () => {
    const input = {
      title: "Test Project",
      description: "Test description",
      id_user: 1
    };

    const result = await projectsService.createProject(input);

    expect(projectsApiMock.createProject).toHaveBeenCalledWith(input);
    expect(result.id).toBe(1);
    expect(result.name).toBe("Test Project");
  });

  it("should delete a project", async () => {
    await projectsService.deleteProject(1);
    expect(projectsApiMock.deleteProject).toHaveBeenCalledWith(1);
  });

  it("should delete user from project", async () => {
    const input = { id_project: 1, id_user: 2 };
    await projectsService.deleteUserFromProject(input);

    expect(projectsApiMock.deleteUserFromProject).toHaveBeenCalledWith(input);
  });

  it("should get a project by ID", async () => {
    const result = await projectsService.getProject(1);

    expect(projectsApiMock.getProject).toHaveBeenCalledWith(1);
    expect(result.id).toBe(1);
    expect(result.name).toBe("Test Project");
  });

  it("should get all projects", async () => {
    const result = await projectsService.getProjects();

    expect(projectsApiMock.getProjects).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Project 1");
    expect(result[1].name).toBe("Project 2");
  });

  it("should get user projects", async () => {
    const result = await projectsService.getUserProjects(1);

    expect(projectsApiMock.getUserProjects).toHaveBeenCalledWith(1);
    expect(Array.isArray(result)).toBe(true);
  });

  it("should update a project", async () => {
    const input = {
      id: 1,
      title: "Updated Project",
      description: "Updated description"
    };

    const result = await projectsService.updateProject(input);

    expect(projectsApiMock.updateProject).toHaveBeenCalledWith(input);
    expect(result.name).toBe("Updated Project");
    expect(result.description).toBe("Updated description");
  });
});
