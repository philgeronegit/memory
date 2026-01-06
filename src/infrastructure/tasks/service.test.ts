import { beforeEach, describe, expect, it, vi } from "vitest";
import { TasksService } from "./service";

const tasksApiMock = {
  bulkUpdateTaskOrder: vi.fn().mockResolvedValue([
    {
      id_item: 1,
      title: "Task 1",
      description: "Description 1",
      created_at: "2025-01-01 10:00:00",
      updated_at: "2025-01-01 10:00:00",
      archived_at: "",
      id_status: 1,
      status: "To Do",
      due_at: "",
      done_at: "",
      priority: "medium",
      id_project: 1,
      project_name: "Test Project",
      id_executive: 1,
      executive_name: "Executive User",
      id_developer: 1,
      developer_name: "Developer User",
      task_order: 1
    },
    {
      id_item: 2,
      title: "Task 2",
      description: "Description 2",
      created_at: "2025-01-02 11:00:00",
      updated_at: "2025-01-02 11:00:00",
      archived_at: "",
      id_status: 1,
      status: "To Do",
      due_at: "",
      done_at: "",
      priority: "high",
      id_project: 1,
      project_name: "Test Project",
      id_executive: 1,
      executive_name: "Executive User",
      id_developer: 1,
      developer_name: "Developer User",
      task_order: 2
    }
  ]),
  createTask: vi.fn().mockResolvedValue({
    id_item: 1,
    title: "Test Task",
    description: "Test description",
    created_at: "2025-01-01 10:00:00",
    updated_at: "2025-01-01 10:00:00",
    archived_at: "",
    id_status: 1,
    status: "To Do",
    due_at: "",
    done_at: "",
    priority: "medium",
    id_project: 1,
    project_name: "Test Project",
    id_executive: 1,
    executive_name: "Executive User",
    id_developer: 1,
    developer_name: "Developer User",
    task_order: 0
  }),
  getTask: vi.fn().mockResolvedValue({
    id_item: 1,
    title: "Test Task",
    description: "Test description",
    created_at: "2025-01-01 10:00:00",
    updated_at: "2025-01-01 10:00:00",
    archived_at: "",
    id_status: 1,
    status: "To Do",
    due_at: "",
    done_at: "",
    priority: "medium",
    id_project: 1,
    project_name: "Test Project",
    id_executive: 1,
    executive_name: "Executive User",
    id_developer: 1,
    developer_name: "Developer User",
    task_order: 0
  }),
  getTasks: vi.fn().mockResolvedValue([
    {
      id_item: 1,
      title: "Task 1",
      description: "Description 1",
      created_at: "2025-01-01 10:00:00",
      updated_at: "2025-01-01 10:00:00",
      archived_at: "",
      id_status: 1,
      status: "To Do",
      due_at: "",
      done_at: "",
      priority: "medium",
      id_project: 1,
      project_name: "Test Project",
      id_executive: 1,
      executive_name: "Executive User",
      id_developer: 1,
      developer_name: "Developer User",
      task_order: 0
    },
    {
      id_item: 2,
      title: "Task 2",
      description: "Description 2",
      created_at: "2025-01-02 11:00:00",
      updated_at: "2025-01-02 11:00:00",
      archived_at: "",
      id_status: 2,
      status: "In Progress",
      due_at: "",
      done_at: "",
      priority: "high",
      id_project: 1,
      project_name: "Test Project",
      id_executive: 2,
      executive_name: "Executive User 2",
      id_developer: 2,
      developer_name: "Developer User 2",
      task_order: 0
    }
  ]),
  getUserTasks: vi.fn().mockResolvedValue([]),
  updateTask: vi.fn().mockResolvedValue({
    id_item: 1,
    title: "Updated Task",
    description: "Updated description",
    created_at: "2025-01-01 10:00:00",
    updated_at: "2025-01-03 10:00:00",
    archived_at: "",
    id_status: 2,
    status: "In Progress",
    due_at: "",
    done_at: "",
    priority: "medium",
    id_project: 1,
    project_name: "Test Project",
    id_executive: 1,
    executive_name: "Executive User",
    id_developer: 1,
    developer_name: "Developer User",
    task_order: 0
  })
};

describe("TasksService", () => {
  let tasksService: TasksService;

  beforeEach(() => {
    vi.clearAllMocks();
    tasksService = new TasksService(tasksApiMock);
  });

  it("should bulk update task order", async () => {
    const input = {
      tasks: [
        { id: 1, task_order: 1 },
        { id: 2, task_order: 2 }
      ]
    };

    const result = await tasksService.bulkUpdateTaskOrder(input);

    expect(tasksApiMock.bulkUpdateTaskOrder).toHaveBeenCalledWith(input);
    expect(result).toHaveLength(2);
    expect(result[0].order).toBe(1);
    expect(result[1].order).toBe(2);
  });

  it("should create a task", async () => {
    const input = {
      title: "Test Task",
      description: "Test description",
      id_user: 1,
      id_status: 1
    };

    const result = await tasksService.createTask(input);

    expect(tasksApiMock.createTask).toHaveBeenCalledWith(input);
    expect(result.id).toBe(1);
    expect(result.title).toBe("Test Task");
  });

  it("should get a task by ID", async () => {
    const result = await tasksService.getTask(1);

    expect(tasksApiMock.getTask).toHaveBeenCalledWith(1);
    expect(result.id).toBe(1);
    expect(result.title).toBe("Test Task");
  });

  it("should get all tasks", async () => {
    const result = await tasksService.getTasks();

    expect(tasksApiMock.getTasks).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe("Task 1");
    expect(result[1].title).toBe("Task 2");
  });

  it("should get user tasks", async () => {
    const result = await tasksService.getUserTasks(1);

    expect(tasksApiMock.getUserTasks).toHaveBeenCalledWith(1);
    expect(Array.isArray(result)).toBe(true);
  });

  it("should update a task", async () => {
    const input = {
      id: 1,
      title: "Updated Task",
      description: "Updated description",
      id_status: 2
    };

    const result = await tasksService.updateTask(input);

    expect(tasksApiMock.updateTask).toHaveBeenCalledWith(input);
    expect(result.title).toBe("Updated Task");
    expect(result.status).toBe("In Progress");
  });
});
