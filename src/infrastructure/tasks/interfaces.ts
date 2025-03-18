import { TaskDto } from "./dto";

export interface TasksApi {
  getTask: (id: number) => Promise<TaskDto>;
  getTasks: () => Promise<TaskDto[]>;
}
