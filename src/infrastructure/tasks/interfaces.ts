import {
  BulkUpdateTaskOrderInput,
  CreateTaskInput,
  TaskDto,
  UpdateTaskInput
} from "./dto";

export interface TasksApi {
  bulkUpdateTaskOrder: (input: BulkUpdateTaskOrderInput) => Promise<TaskDto[]>;
  createTask: (input: CreateTaskInput) => Promise<TaskDto>;
  getTask: (id: number) => Promise<TaskDto>;
  getTasks: () => Promise<TaskDto[]>;
  getUserTasks: (userId?: number) => Promise<TaskDto[]>;
  updateTask: (input: UpdateTaskInput) => Promise<TaskDto>;
}
