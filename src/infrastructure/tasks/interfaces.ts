import { TaskDto, UpdateTaskInput } from "./dto";

export interface TasksApi {
  getTask: (id: number) => Promise<TaskDto>;
  getTasks: () => Promise<TaskDto[]>;
  updateTask: (input: UpdateTaskInput) => Promise<TaskDto>;
}
