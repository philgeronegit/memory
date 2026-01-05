import {
  BulkUpdateTaskOrderInput,
  CreateTaskInput,
  UpdateTaskInput
} from "./dto";
import { TasksApi } from "./interfaces";
import { dtoToTask } from "./transform";

export class TasksService {
  constructor(private api: TasksApi) {
    this.api = api;
  }

  async bulkUpdateTaskOrder(input: BulkUpdateTaskOrderInput) {
    const tasks = await this.api.bulkUpdateTaskOrder(input);
    return tasks.map(dtoToTask);
  }

  async createTask(input: CreateTaskInput) {
    const task = await this.api.createTask(input);
    return dtoToTask(task);
  }

  async getTask(id: number) {
    const task = await this.api.getTask(id);
    return dtoToTask(task);
  }

  async getTasks() {
    const tasks = await this.api.getTasks();
    return tasks.map(dtoToTask);
  }

  async getUserTasks(userId?: number) {
    const tasks = await this.api.getUserTasks(userId);
    return tasks.map(dtoToTask);
  }

  async updateTask(input: UpdateTaskInput) {
    const task = await this.api.updateTask(input);
    return dtoToTask(task);
  }
}
