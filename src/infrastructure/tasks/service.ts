import { UpdateTaskInput } from "./dto";
import { TasksApi } from "./interfaces";
import { dtoToTask } from "./transform";

export class TasksService {
  constructor(private api: TasksApi) {
    this.api = api;
  }

  async getTask(id: number) {
    const task = await this.api.getTask(id);
    return dtoToTask(task);
  }

  async getTasks() {
    const tasks = await this.api.getTasks();
    return tasks.map(dtoToTask);
  }

  async updateTask(input: UpdateTaskInput) {
    const task = await this.api.updateTask(input);
    return dtoToTask(task);
  }
}
