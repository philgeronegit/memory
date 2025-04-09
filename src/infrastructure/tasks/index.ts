import TasksApi from "./api";
import { TasksService } from "./service";

const tasksService = new TasksService(TasksApi);

export default tasksService;
