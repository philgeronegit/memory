import tasksApi from "./api";
import { TasksService } from "./service";

const tasksService = new TasksService(tasksApi);

export default tasksService;
